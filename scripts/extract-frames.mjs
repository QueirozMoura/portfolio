// Pipeline de mídia: vídeos originais (intactos) → sequências WebP + posters + manifest.
// Uso: npm run frames   |   QUALITY_D=90 npm run frames   |   node scripts/extract-frames.mjs hero contato
//      PROFILES=m npm run frames   (gera só o perfil indicado, sem tocar nos demais nem nos posters)
// Só escreve em public/frames, public/posters e src/generated — nunca toca nos vídeos/imagens originais.
import { execFileSync } from 'node:child_process'
import { readdirSync, mkdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import ffmpeg from 'ffmpeg-static'

// Cada seção é localizada pelo prefixo do nome (estável entre versões 720p/1080p). Confirmado por inspeção visual.
const SECTIONS = [
  // focusX = mesmo foco horizontal usado em <Scene focusX> (recorte retrato do perfil "m")
  { id: 'hero', video: 'Camera_flying_through', image: 'Liquid_glass_sculpture', focusX: 0.5 },
  { id: 'sobre', video: 'Glass_sculpture_animation', image: 'Busto_Futurista', focusX: 0.15 },
  { id: 'tecnologias', video: 'Creating_futuristic_3D', image: 'Núcleo_Tech', focusX: 0.5 },
  { id: 'projetos', video: 'Holographic_software_gallery', image: 'Carrossel_Neon', focusX: 0.5 },
  { id: 'contato', video: 'Holographic_portal', image: 'Portal_de_Contato', focusX: 0.5 },
]

// d = desktop/tablet (resolução nativa, sem upscale) · t = celulares / pouca memória
// m = celular em retrato: recorte 9:16 do vídeo (a região que o "cover" já mostrava), em vez de decodificar o quadro 16:9 inteiro
const PROFILES = [
  { dir: 'd', maxWidth: 1920, fps: 15, quality: Number(process.env.QUALITY_D ?? 86) },
  { dir: 't', maxWidth: 1280, fps: 12, quality: Number(process.env.QUALITY_T ?? 84) },
  { dir: 'm', portrait: { w: 450, h: 800 }, fps: 10, quality: Number(process.env.QUALITY_M ?? 80) },
  // p = tablet em pé: mesmo recorte, em resolução nativa (608×1080, sem ampliar)
  { dir: 'p', portrait: { w: 608, h: 1080 }, fps: 12, quality: Number(process.env.QUALITY_P ?? 82) },
].filter((p) => !process.env.PROFILES || process.env.PROFILES.split(',').includes(p.dir))
const ONLY_PROFILES = !!process.env.PROFILES

const root = process.cwd()
const files = readdirSync(root).map((n) => n.normalize('NFC'))
const only = process.argv.slice(2)

const find = (prefix, ext) => {
  const hits = files.filter((n) => n.startsWith(prefix.normalize('NFC')) && n.toLowerCase().endsWith(ext))
  if (hits.length !== 1) throw new Error(`Esperava 1 arquivo para "${prefix}*${ext}", achei ${hits.length}: ${hits.join(', ')}`)
  return join(root, hits[0])
}
const run = (args) => execFileSync(ffmpeg, ['-v', 'error', '-y', ...args], { stdio: 'inherit' })
const probe = (file) => {
  const out = execFileSync(ffmpeg, ['-hide_banner', '-i', file], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).toString()
  return out
}
const dims = (file) => {
  let txt = ''
  try {
    probe(file)
  } catch (e) {
    txt = String(e.stderr)
  }
  const m = txt.match(/Video:.*?, (\d{2,5})x(\d{2,5})/)
  if (!m) throw new Error(`Não consegui ler a resolução de ${file}`)
  return { w: Number(m[1]), h: Number(m[2]) }
}

mkdirSync(join(root, 'public/posters'), { recursive: true })
mkdirSync(join(root, 'src/generated'), { recursive: true })
const manifest = {}

for (const s of SECTIONS.filter((x) => !only.length || only.includes(x.id))) {
  const video = find(s.video, '.mp4')
  const image = find(s.image, '.jpg')
  const src = dims(video)
  manifest[s.id] = {}
  console.log(`\n[${s.id}] ${video.split('/').pop()} (${src.w}×${src.h})`)

  if (!ONLY_PROFILES) {
    rmSync(join(root, `public/frames/${s.id}`), { recursive: true, force: true }) // limpa também perfis obsoletos
    run(['-i', image, '-vf', 'scale=min(1920\\,iw):-2', '-c:v', 'libwebp', '-quality', '88', join(root, `public/posters/${s.id}.webp`)])
    run(['-i', image, '-vf', 'scale=min(1000\\,iw):-2', '-c:v', 'libwebp', '-quality', '82', join(root, `public/posters/${s.id}-m.webp`)])
  }

  for (const p of PROFILES) {
    let width, height, filter
    if (p.portrait) {
      // recorte com a proporção do perfil, posicionado pelo foco da cena; depois reduz (nunca amplia)
      ;({ w: width, h: height } = p.portrait)
      const cropW = Math.min(src.w, Math.round((src.h * width) / height / 2) * 2)
      const x = Math.round(((src.w - cropW) * s.focusX) / 2) * 2
      filter = `fps=${p.fps},crop=${cropW}:${src.h}:${x}:0,scale=${width}:${height}:flags=lanczos+accurate_rnd+full_chroma_int`
    } else {
      width = Math.min(p.maxWidth, src.w) // nunca faz upscale
      height = Math.round((src.h * width) / src.w / 2) * 2
      filter = `fps=${p.fps},scale=${width}:${height}:flags=lanczos+accurate_rnd+full_chroma_int`
    }
    const out = join(root, `public/frames/${s.id}/${p.dir}`)
    rmSync(out, { recursive: true, force: true })
    mkdirSync(out, { recursive: true })
    run([
      '-i', video,
      '-vf', filter,
      '-c:v', 'libwebp', '-quality', String(p.quality), '-compression_level', '6',
      join(out, '%04d.webp'),
    ])
    const list = readdirSync(out)
    const bytes = list.reduce((a, f) => a + statSync(join(out, f)).size, 0)
    manifest[s.id][p.dir] = { count: list.length, width, height, bytes, ...(p.portrait && { cropped: true }) }
    console.log(`  ${p.dir}: ${list.length} frames ${width}×${height} q${p.quality} → ${(bytes / 1048576).toFixed(1)} MB (${(bytes / list.length / 1024).toFixed(0)} KB/frame)`)
  }
}

// merge com manifest existente quando rodar só algumas seções
let prev = {}
try {
  prev = JSON.parse((await import('node:fs')).readFileSync(join(root, 'src/generated/frames.json'), 'utf8'))
} catch {
  /* primeira execução */
}
const merged = { ...prev }
for (const [id, profiles] of Object.entries(manifest)) merged[id] = { ...(prev[id] ?? {}), ...profiles }
writeFileSync(join(root, 'src/generated/frames.json'), JSON.stringify(merged, null, 2) + '\n')
console.log('\nManifest: src/generated/frames.json')

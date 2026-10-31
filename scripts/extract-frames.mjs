// Pipeline de mídia: vídeos originais (intactos) → sequências WebP + posters + manifest.
// Uso: npm run frames   |   QUALITY_D=90 npm run frames   |   node scripts/extract-frames.mjs hero contato
// Só escreve em public/frames, public/posters e src/generated — nunca toca nos vídeos/imagens originais.
import { execFileSync } from 'node:child_process'
import { readdirSync, mkdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import ffmpeg from 'ffmpeg-static'

// Cada seção é localizada pelo prefixo do nome (estável entre versões 720p/1080p). Confirmado por inspeção visual.
const SECTIONS = [
  { id: 'hero', video: 'Camera_flying_through', image: 'Liquid_glass_sculpture' },
  { id: 'sobre', video: 'Glass_sculpture_animation', image: 'Busto_Futurista' },
  { id: 'tecnologias', video: 'Creating_futuristic_3D', image: 'Núcleo_Tech' },
  { id: 'projetos', video: 'Holographic_software_gallery', image: 'Carrossel_Neon' },
  { id: 'contato', video: 'Holographic_portal', image: 'Portal_de_Contato' },
]

// d = desktop/tablet (resolução nativa, sem upscale) · t = celulares / pouca memória
const PROFILES = [
  { dir: 'd', maxWidth: 1920, fps: 15, quality: Number(process.env.QUALITY_D ?? 86) },
  { dir: 't', maxWidth: 1280, fps: 12, quality: Number(process.env.QUALITY_T ?? 84) },
]

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

  rmSync(join(root, `public/frames/${s.id}`), { recursive: true, force: true }) // limpa também perfis obsoletos
  run(['-i', image, '-vf', 'scale=min(1920\\,iw):-2', '-c:v', 'libwebp', '-quality', '88', join(root, `public/posters/${s.id}.webp`)])
  run(['-i', image, '-vf', 'scale=min(1000\\,iw):-2', '-c:v', 'libwebp', '-quality', '82', join(root, `public/posters/${s.id}-m.webp`)])

  for (const p of PROFILES) {
    const width = Math.min(p.maxWidth, src.w) // nunca faz upscale
    const height = Math.round((src.h * width) / src.w / 2) * 2
    const out = join(root, `public/frames/${s.id}/${p.dir}`)
    mkdirSync(out, { recursive: true })
    run([
      '-i', video,
      '-vf', `fps=${p.fps},scale=${width}:${height}:flags=lanczos+accurate_rnd+full_chroma_int`,
      '-c:v', 'libwebp', '-quality', String(p.quality), '-compression_level', '6',
      join(out, '%04d.webp'),
    ])
    const list = readdirSync(out)
    const bytes = list.reduce((a, f) => a + statSync(join(out, f)).size, 0)
    manifest[s.id][p.dir] = { count: list.length, width, height, bytes }
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
writeFileSync(join(root, 'src/generated/frames.json'), JSON.stringify({ ...prev, ...manifest }, null, 2) + '\n')
console.log('\nManifest: src/generated/frames.json')

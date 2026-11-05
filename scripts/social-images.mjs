/**
 * Gera as imagens de compartilhamento e o ícone a partir da identidade atual do site:
 *   public/og.jpg               1200×630 (Open Graph / Twitter)
 *   public/apple-touch-icon.png 180×180
 * Sem dependências novas: usa o Chrome/Chromium instalado (modo headless) e o ffmpeg-static do projeto.
 * A fita da Hero é reaproveitada do HTML pré-renderizado, então rode `npm run build` antes.
 *
 * Uso: npm run social:images   (CHROME_PATH=/caminho/do/chrome npm run social:images, se necessário)
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import ffmpeg from 'ffmpeg-static'

const CHROME =
  process.env.CHROME_PATH ??
  ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser'].find((bin) => {
    try {
      execFileSync('which', [bin], { stdio: 'ignore' })
      return true
    } catch {
      return false
    }
  })
if (!CHROME) throw new Error('Chrome/Chromium não encontrado: defina CHROME_PATH')

const html = readFileSync('dist/index.html', 'utf8')
const ribbon = html.match(/<svg class="hero-ribbon[\s\S]*?<\/svg>/)?.[0]
if (!ribbon) throw new Error('fita da Hero não encontrada em dist/index.html: rode `npm run build` antes')

const fonts = pathToFileURL(resolve('public/fonts')).href
const BASE = `
  @font-face { font-family: 'Inter'; font-weight: 100 900; src: url('${fonts}/inter-latin.woff2') format('woff2'); }
  @font-face { font-family: 'Space Grotesk'; font-weight: 300 700; src: url('${fonts}/space-grotesk-latin.woff2') format('woff2'); }
  * { margin: 0; box-sizing: border-box; }
  html, body { width: var(--w); height: var(--h); overflow: hidden; background: #101114; color: #f4f3ee; }
  .lime { color: #c5f277; }
`

const OG = `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><style>${BASE}
  :root { --w: 1200px; --h: 630px; }
  body { position: relative; font-family: 'Inter', sans-serif; }
  .bg { position: absolute; inset: 0;
    background: radial-gradient(55% 60% at 80% 42%, rgb(197 242 119 / 0.09), transparent 70%), linear-gradient(to bottom, transparent 70%, #030308); }
  .dots { position: absolute; inset: 0; background-image: radial-gradient(rgb(244 243 238 / 0.08) 1px, transparent 1.2px); background-size: 28px 28px;
    -webkit-mask-image: radial-gradient(60% 70% at 75% 40%, #000, transparent 75%); }
  svg { position: absolute; top: -50px; right: -95px; width: 680px; height: 680px; }
  .content { position: absolute; left: 80px; top: 72px; bottom: 64px; width: 720px; display: flex; flex-direction: column; }
  .logo { font: 700 34px/1 'Space Grotesk'; letter-spacing: -0.04em; }
  .eyebrow { margin-top: auto; display: flex; align-items: center; gap: 16px; font-size: 18px; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #a1a3ab; }
  .eyebrow i { display: block; width: 44px; height: 2px; background: #c5f277; }
  h1 { margin-top: 22px; font: 700 112px/0.9 'Space Grotesk'; letter-spacing: -0.05em; }
  p { margin-top: 26px; font: 500 34px/1.12 'Space Grotesk'; letter-spacing: -0.03em; max-width: 15em; }
  .meta { margin-top: 40px; display: flex; gap: 14px; align-items: center; font-size: 20px; color: #a1a3ab; }
  .meta b { width: 5px; height: 5px; border-radius: 50%; background: rgb(244 243 238 / 0.35); }
</style><body>
  <div class="bg"></div><div class="dots"></div>${ribbon}
  <div class="content">
    <div class="logo">GM<span class="lime">•</span></div>
    <div class="eyebrow"><i></i>Desenvolvedor Full Stack</div>
    <h1>Gustavo Moura</h1>
    <p>Desenvolvendo <span class="lime">soluções reais</span> com tecnologia.</p>
    <div class="meta"><span>gustavomoura.dev</span><b></b><span>São Paulo, Brasil</span></div>
  </div>
</body></html>`

const ICON = `<!doctype html><html><meta charset="utf-8"><style>${BASE}
  :root { --w: 180px; --h: 180px; }
  body { display: grid; place-items: center; font: 700 70px/1 'Space Grotesk'; letter-spacing: -0.05em; }
</style><body><div>GM<span class="lime">•</span></div></body></html>`

const tmp = mkdtempSync(join(tmpdir(), 'social-'))
function shot(name, page, w, h) {
  const file = join(tmp, `${name}.html`)
  const png = join(tmp, `${name}.png`)
  writeFileSync(file, page)
  execFileSync(CHROME, [
    '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--allow-file-access-from-files', '--virtual-time-budget=3000', `--window-size=${w},${h}`, `--screenshot=${png}`, pathToFileURL(file).href,
  ], { stdio: 'ignore' })
  return png
}

try {
  const og = shot('og', OG, 1200, 630)
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', og, '-q:v', '3', 'public/og.jpg'])
  const icon = shot('icon', ICON, 180, 180)
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', icon, '-compression_level', '9', 'public/apple-touch-icon.png'])
  for (const f of ['public/og.jpg', 'public/apple-touch-icon.png']) {
    if (!existsSync(f)) throw new Error(`${f} não foi gerado`)
    console.log(`${f}  ${(statSync(f).size / 1024).toFixed(1)} KB`)
  }
} finally {
  rmSync(tmp, { recursive: true, force: true })
}

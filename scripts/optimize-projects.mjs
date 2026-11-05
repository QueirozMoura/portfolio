/**
 * Gera as versões AVIF responsivas dos screenshots dos projetos a partir de public/projects/<base>-1440.webp.
 * Uso: npm run projects:images   (CRF=32 npm run projects:images para ajustar a qualidade)
 * Saída: public/projects/<base>-{640,960,1440}.avif. Os WebP existentes continuam como fallback.
 */
import { execFileSync } from 'node:child_process'
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import ffmpeg from 'ffmpeg-static'

const DIR = 'public/projects'
const WIDTHS = [640, 960, 1440]
const CRF = process.env.CRF ?? '30'

const bases = readdirSync(DIR)
  .filter((f) => f.endsWith('-1440.webp'))
  .map((f) => f.replace(/-1440\.webp$/, ''))

for (const base of bases) {
  const src = join(DIR, `${base}-1440.webp`)
  for (const w of WIDTHS) {
    const out = join(DIR, `${base}-${w}.avif`)
    execFileSync(ffmpeg, [
      '-y', '-loglevel', 'error', '-i', src,
      '-vf', `scale=${w}:-2:flags=lanczos,format=yuv420p`,
      '-c:v', 'libaom-av1', '-still-picture', '1', '-crf', CRF, '-cpu-used', '4', '-row-mt', '1',
      out,
    ])
    console.log(`${out}  ${(statSync(out).size / 1024).toFixed(1)} KB`)
  }
}

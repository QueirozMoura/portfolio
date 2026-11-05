/**
 * Pré-renderização no build (SSG de uma página, sem framework):
 * 1. compila src/entry-server.tsx para Node com o próprio Vite (build SSR temporário);
 * 2. renderiza <App /> com react-dom/server;
 * 3. injeta o HTML em dist/index.html, dentro de <div id="root">, que o cliente hidrata (hydrateRoot).
 * Roda depois de `vite build` (ver "build" no package.json).
 */
import { build } from 'vite'
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const OUT = resolve('.prerender')
const INDEX = resolve('dist/index.html')
const MARK = '<div id="root"></div>'

await build({ logLevel: 'warn', build: { ssr: 'src/entry-server.tsx', outDir: OUT, emptyOutDir: true, copyPublicDir: false } })

try {
  const { render } = await import(pathToFileURL(resolve(OUT, 'entry-server.js')).href)
  const html = render()
  const template = readFileSync(INDEX, 'utf8')
  if (!template.includes(MARK)) throw new Error(`marcador ${MARK} não encontrado em dist/index.html`)
  writeFileSync(INDEX, template.replace(MARK, `<div id="root">${html}</div>`))
  console.log(`prerender: dist/index.html (+${(html.length / 1024).toFixed(1)} KB de HTML)`)
} finally {
  rmSync(OUT, { recursive: true, force: true })
}

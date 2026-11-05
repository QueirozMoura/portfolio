# Portfólio — Gustavo Moura

Portfólio pessoal de **Gustavo Moura**, desenvolvedor Full Stack em São Paulo. Página única, editorial e escura, com cinco seções — Início, Sobre, Tecnologias, Projetos e Contato — construídas só com HTML, CSS e SVG inline, pré-renderizadas no build e hidratadas pelo React.

Site: <https://gustavomoura.dev> · GitHub: [@QueirozMoura](https://github.com/QueirozMoura) · [LinkedIn](https://www.linkedin.com/in/gustavomoura-/)

## Stack

- **React 19** + **TypeScript** — componentes e hidratação do HTML pré-renderizado
- **Vite 8** — dev server e build
- **Tailwind CSS 4** — utilitários de layout; o visual de cada seção fica em `src/styles/index.css` (`@layer components`)
- **lucide-react** (ícones de interface) e **simple-icons** (ícone do GitHub), importados individualmente
- Fontes auto-hospedadas: **Space Grotesk** (títulos) e **Inter** (texto), subconjunto latin, eixo de peso variável

Não há bibliotecas de animação: as entradas são animações CSS (`opacity`/`transform`) e, onde o navegador suporta, *scroll-driven animations* (`animation-timeline: view()`), executadas pelo compositor.

## Estrutura

```
index.html                 metadados (SEO, Open Graph, Twitter, JSON-LD) e preload das fontes
src/
  main.tsx                 entrada do cliente: hidrata o HTML pré-renderizado (createRoot no dev)
  entry-server.tsx         entrada do build de pré-renderização (renderToString)
  App.tsx                  composição da página
  sections/                Hero, About, Tech, Projects, Contact
  components/              Navbar, Footer, ProgressBar, HeroRibbon, AboutGraphic, ui (ícones, link externo)
  data/                    site.ts (nome, links, e-mail, currículo), projects.ts, stack.tsx
  styles/index.css         tokens de cor/fonte (@theme) e estilos das seções
public/
  projects/                screenshots dos projetos (AVIF 640/960/1440 + WebP 800/1440 de fallback)
  fonts/                   woff2 auto-hospedados
  og.jpg, apple-touch-icon.png, favicon.svg, robots.txt, sitemap.xml, CNAME
scripts/
  prerender.mjs            pré-renderiza a página em dist/index.html
  optimize-projects.mjs    gera as versões AVIF dos screenshots
  social-images.mjs        gera og.jpg e apple-touch-icon.png
```

## Desenvolvimento

Requer Node.js 20.19+ (ou 22.12+).

```bash
npm install
npm run dev        # servidor de desenvolvimento (renderização só no cliente)
npm run lint
npm run build      # typecheck + build + pré-renderização em dist/
npm run preview    # serve dist/ localmente
```

### Build e pré-renderização

`npm run build` executa `tsc -b`, `vite build` e `node scripts/prerender.mjs`. O script compila `src/entry-server.tsx` para Node com o próprio Vite (build SSR temporário em `.prerender/`, removido ao final), renderiza `<App />` com `react-dom/server` e injeta o HTML dentro de `<div id="root">` em `dist/index.html`. No navegador, `main.tsx` usa `hydrateRoot`: o DOM do servidor é reaproveitado, sem renderização duplicada.

Para a hidratação continuar sem divergências, a renderização precisa ser determinística: nada de `window`, `Date`, `Math.random` etc. durante o render. O único valor variável — o ano do rodapé — vem do build (`__BUILD_YEAR__`, em `vite.config.ts`) e é corrigido após hidratar via `useSyncExternalStore`, se o ano mudou.

### Imagens

```bash
npm run projects:images     # public/projects/<base>-1440.webp → <base>-{640,960,1440}.avif (CRF=32 ajusta a qualidade)
npm run social:images       # public/og.jpg (1200×630) e apple-touch-icon.png (180×180); rode depois do build
```

Os dois usam o `ffmpeg-static` do projeto. `social:images` também usa o Chrome/Chromium instalado no sistema (modo headless; `CHROME_PATH=/caminho/do/chrome` se ele não estiver no PATH) e reaproveita a fita SVG da Hero a partir do HTML pré-renderizado.

Para adicionar um projeto: salve o screenshot como `public/projects/<base>-1440.webp` (e `-800.webp`), rode `npm run projects:images` e registre o projeto em `src/data/projects.ts`.

## Deploy

Publicado no **GitHub Pages** em <https://gustavomoura.dev> pelo workflow `.github/workflows/deploy.yml`, que roda `npm ci`, `npm run lint` e `npm run build` a cada push na `main` e publica `dist/`. O domínio é definido em `public/CNAME`.

## Decisões de desempenho

- **HTML pré-renderizado**: o conteúdo aparece sem esperar o JavaScript; o JS só hidrata a página (interatividade da navbar, menu mobile e barra de progresso). Links com âncora (`/#projetos`) funcionam ao abrir direto, e a página é legível sem JS.
- **Sem bibliotecas de animação** nem canvas/vídeo: animações CSS de `opacity`/`transform`, sem loops; `prefers-reduced-motion` desliga todas.
- **Imagens responsivas**: AVIF com `srcset`/`sizes` e fallback WebP, `loading="lazy"`, dimensões explícitas (sem layout shift). Nenhuma imagem na primeira dobra — a arte da Hero é um SVG inline.
- **Fontes**: woff2 auto-hospedados e pré-carregados, `font-display: swap` e um fallback com métricas ajustadas para a Space Grotesk.
- **CSS externo** (≈ 8 KB gzip): inlinar foi testado e melhorou o FCP, mas atrasou o LCP no Lighthouse mobile (o HTML maior disputa banda com a fonte do logo), então ficou externo.
- **Listeners** de scroll passivos e agrupados por `requestAnimationFrame`; a barra de progresso usa `transform`.

## Configuração rápida

- **E-mail de contato**: `email` em `src/data/site.ts` (vazio oculta o botão de e-mail).
- **Currículo**: coloque o PDF em `public/` e defina `resume` em `src/data/site.ts` (ex.: `'/curriculo-gustavo-moura.pdf'`). Vazio mantém o botão "Baixar Currículo" visível e desativado.
- **Projetos e tecnologias**: `src/data/projects.ts` e `src/data/stack.tsx`.

© 2026 Gustavo Moura

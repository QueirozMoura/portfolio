# Portfólio — Gustavo Moura

Portfólio pessoal de **Gustavo Moura**, desenvolvedor Full Stack em São Paulo. A experiência é uma narrativa cinematográfica de cinco cenas 3D em vidro líquido (Hero, Sobre, Tecnologias, Projetos e Contato), controladas pelo scroll.

Site: <https://gustavomoura.dev> · GitHub: [@QueirozMoura](https://github.com/QueirozMoura) · [LinkedIn](https://www.linkedin.com/in/gustavomoura-/)

## Stack

React 19 · TypeScript · Vite · Tailwind CSS 4 · GSAP + ScrollTrigger · Lucide React · simple-icons (ícones das tecnologias, importados individualmente).

## Como funciona

- **Cenas scroll-driven:** cada seção é um vídeo convertido em sequência de frames WebP, desenhada em um `<canvas>` 2D. O frame exibido depende do progresso do scroll (sem `<video>` nem autoplay).
- **Pinning com `position: sticky`:** cada cena fica fixa durante o percurso e a próxima sobe sobre os últimos instantes da anterior, formando um **crossfade** real entre dois canvases.
- **Uma única suavização:** o ScrollTrigger só informa o alvo; um ticker do GSAP interpola o progresso e alimenta ao mesmo tempo os textos (timeline) e o frame do canvas.
- **Carregamento inteligente:** o hero carrega primeiro; as demais cenas começam por um esboço (1 a cada 4 frames) e completam quando ficam perto da tela. Os frames decodificados ficam num cache LRU limitado por bytes e são liberados quando a cena sai do viewport. Os posters cobrem qualquer espera.
- **Qualidade:** frames em resolução nativa (1920×1080) para desktop/tablet e 1280×720 para celulares ou aparelhos com pouca memória. O canvas renderiza na escala do frame, sem ampliação por CSS.
- **Acessibilidade e fallback:** com `prefers-reduced-motion`, economia de dados ou aparelhos fracos, o site mostra os posters estáticos, sem as faixas longas de scroll. Há skip link, foco visível, menu mobile acessível e links externos com `rel="noopener noreferrer"`.

## Rodando localmente

Requer Node.js 20.19+ (ou 22.12+).

```bash
npm install
npm run dev        # servidor de desenvolvimento
npm run build      # typecheck + build de produção em dist/
npm run preview    # serve o build localmente
npm run lint
```

## Estrutura

```
src/
  config/scenes.ts      duração de cada cena, crossfade, suavização (único lugar para ajustar o ritmo)
  components/           Scene, ScrollSequence, Navbar, ProgressBar, Footer, ui
  sections/             Hero, About, Tech, Projects, Contact
  lib/                  frameSequence (loader + cache), capabilities, gsap, motion-context
  data/                 projetos, stack e dados do site
  generated/frames.json manifest gerado pelo pipeline de mídia
public/
  frames/<cena>/{d,t}/  sequências WebP (d = 1920×1080, t = 1280×720)
  posters/              imagens estáticas de cada cena
scripts/extract-frames.mjs
```

## Pipeline de mídia

Os frames já estão versionados em `public/frames`, então o site roda sem os vídeos. Os vídeos e imagens originais (gerados com IA) **não** fazem parte do repositório. Para regenerar os frames, coloque os vídeos 1080p na raiz do projeto e rode:

```bash
npm run frames                 # QUALITY_D=90 npm run frames para ajustar a qualidade
```

O script usa `ffmpeg-static`, não faz upscale e atualiza `src/generated/frames.json`.

## Ajustes rápidos

- **Ritmo do scroll:** `src/config/scenes.ts` (distância de cada cena em alturas de viewport).
- **E-mail de contato:** preencha `email` em `src/data/site.ts` para exibir o botão de e-mail na seção Contato.
- **Projetos e tecnologias:** `src/data/projects.ts` e `src/data/stack.tsx`.

## Deploy

Publicado no **GitHub Pages** em <https://gustavomoura.dev> por um workflow (`.github/workflows/deploy.yml`) que roda lint e build a cada push na `main`. O domínio é definido por `public/CNAME`.

© 2026 Gustavo Moura

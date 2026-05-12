# 🚀 GM DevWeb — Portfólio Premium (React + TypeScript + Tailwind)

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=061a22)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)

![Status](https://img.shields.io/badge/status-online-00d4ff?style=flat-square)
![UI](https://img.shields.io/badge/UI-dark%20futurista-7c4dff?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-00c853?style=flat-square)

</div>

---

## ✨ Sobre o projeto

**GM DevWeb** é um portfólio one-page com estética **dark, futurista e premium**, desenvolvido para destacar projetos de engenharia full stack, cloud e IA.

### Destaques visuais
- Glassmorphism com blur e transparência
- Paleta neon cyan/blue/purple
- Cards translúcidos com glow e microinterações
- Layout responsivo (desktop, tablet e mobile)
- Navegação por âncoras com experiência fluida

### Características técnicas
- Componentização limpa com React + TypeScript
- Estilo com Tailwind CSS + utilitários globais
- Estrutura data-driven para projetos, tecnologias e timeline
- Acessibilidade (labels, semântica e contraste)

---

## 🧩 Seções do portfólio

- Header / Navegação principal
- Hero
- Sobre mim
- Projetos em destaque
- Stack / Tecnologias
- Jornada / Experiência
- Contato (com validação front-end)
- Footer
- SideNav desktop (comportamento contextual)

---

## 🛠️ Stack utilizada

- **React**
- **TypeScript**
- **Tailwind CSS**
- **Vite**
- **Lucide React** (ícones)
- **Google Fonts** (Inter + JetBrains Mono)

---

## 📁 Estrutura de pastas

```bash
src/
  components/
    layout/
      Header.tsx
      Footer.tsx
      SideNav.tsx
    sections/
      HeroSection.tsx
      AboutSection.tsx
      ProjectsSection.tsx
      TechStackSection.tsx
      JourneySection.tsx
      ContactSection.tsx
    ui/
      GlassCard.tsx
      SectionTitle.tsx
      Button.tsx
      Badge.tsx
  data/
    projects.ts
    techStack.ts
    timeline.ts
    socialLinks.ts
  styles/
    globals.css
  App.tsx
  main.tsx
```

---

## ⚙️ Como rodar o projeto localmente

### 1) Instalar dependências
```bash
npm install
```

### 2) Executar em modo desenvolvimento
```bash
npm run dev
```

### 3) Gerar build de produção
```bash
npm run build
```

### 4) Visualizar build local
```bash
npm run preview
```

---

## 📜 Scripts disponíveis

- `npm run dev` → inicia servidor de desenvolvimento (Vite)
- `npm run build` → valida TypeScript e gera build de produção
- `npm run preview` → pré-visualiza build de produção
- `npm run lint` → executa lint no projeto

---

## 🧠 Onde editar o conteúdo

### Projetos
Edite em:
- `src/data/projects.ts`

### Tecnologias / Stack
Edite em:
- `src/data/techStack.ts`

### Jornada / Experiência
Edite em:
- `src/data/timeline.ts`

### Links sociais e contato rápido (Header / Mobile / Footer)
Edite em:
- `src/data/socialLinks.ts`

---

## 🎨 Design system (tokens e utilitários)

### Configuração de cores
- `tailwind.config.ts`
- `tailwind.config.cjs`

### Utilitários globais customizados
- `src/styles/globals.css`

Classes utilitárias principais:
- `.glass-panel`
- `.glass-card`
- `.glow-cyan`
- `.ambient-glow`
- `.bg-gradient-hero`
- `.neon-border-glow`
- `.input-dark`
- `.btn-primary-gradient`

---

## ♿ Acessibilidade e UX

- Estrutura semântica: `header`, `nav`, `main`, `section`, `footer`
- Inputs com `label`
- Links e botões com descrições claras
- Contraste visual adequado para tema dark
- Responsividade mobile-first

---

## 📦 Deploy (sugestões)

Você pode publicar facilmente em:
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages (com ajustes de base path, se necessário)

---

## 🔐 Licença

Este projeto está sob a licença **MIT**.  
Sinta-se livre para usar como base e personalizar para seu portfólio.

---

## 💙 Autor

Desenvolvido por **GM DevWeb** com foco em performance, arquitetura e experiência visual premium.

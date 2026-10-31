import {
  siReact, siTypescript, siJavascript, siHtml5, siCss, siTailwindcss, siVite, siNodedotjs, siExpress,
  siFastify, siPostgresql, siPrisma, siSequelize, siJsonwebtokens, siZod, siGit, siGithub, siDocker,
  siVercel, siRender, siVitest, siTestinglibrary, type SimpleIcon,
} from 'simple-icons'
import { Cookie, Drama, KeyRound, Waypoints, type LucideIcon } from 'lucide-react'

export type TechIcon = { kind: 'brand'; icon: SimpleIcon } | { kind: 'lucide'; icon: LucideIcon }
export interface Tech {
  name: string
  icon: TechIcon
}
export interface TechGroup {
  title: string
  items: Tech[]
}

const b = (name: string, icon: SimpleIcon): Tech => ({ name, icon: { kind: 'brand', icon } })
const l = (name: string, icon: LucideIcon): Tech => ({ name, icon: { kind: 'lucide', icon } })

export const TECH_GROUPS: TechGroup[] = [
  {
    title: 'Frontend',
    items: [b('React', siReact), b('TypeScript', siTypescript), b('JavaScript', siJavascript), b('HTML', siHtml5), b('CSS', siCss), b('Tailwind CSS', siTailwindcss), b('Vite', siVite)],
  },
  { title: 'Backend', items: [b('Node.js', siNodedotjs), b('Express', siExpress), b('Fastify', siFastify), l('REST APIs', Waypoints)] },
  { title: 'Banco de dados', items: [b('PostgreSQL', siPostgresql), b('Prisma', siPrisma), b('Sequelize', siSequelize)] },
  {
    title: 'Autenticação e segurança',
    items: [b('JWT', siJsonwebtokens), l('Cookies HttpOnly', Cookie), l('Argon2', KeyRound), b('Zod', siZod)],
  },
  { title: 'Ferramentas e infraestrutura', items: [b('Git', siGit), b('GitHub', siGithub), b('Docker', siDocker), b('Vercel', siVercel), b('Render', siRender)] },
  { title: 'Testes', items: [b('Vitest', siVitest), b('Testing Library', siTestinglibrary), l('Playwright', Drama)] },
]

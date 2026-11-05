export interface TechGroup {
  /** Identificador estável (usado no símbolo gráfico do grupo). */
  id: 'front' | 'back' | 'data' | 'tools'
  title: string
  description: string
  items: string[]
}

/**
 * Stack em quatro grupos. Além da lista principal, preserva as competências que já estavam documentadas
 * no portfólio: Vite (front-end), Zod, Cookies HttpOnly e Argon2 (back-end/segurança) e Testing Library (testes).
 */
export const TECH_GROUPS: TechGroup[] = [
  {
    id: 'front',
    title: 'Front-end',
    description: 'Interfaces responsivas e acessíveis, com foco na experiência de quem usa.',
    items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Vite'],
  },
  {
    id: 'back',
    title: 'Back-end',
    description: 'APIs, regras de negócio, autenticação e validação de dados.',
    items: ['Node.js', 'Express', 'Fastify', 'APIs REST', 'Autenticação JWT', 'Cookies HttpOnly', 'Argon2', 'Zod'],
  },
  {
    id: 'data',
    title: 'Banco de dados',
    description: 'Modelagem relacional e acesso a dados com ORMs.',
    items: ['PostgreSQL', 'Prisma', 'Sequelize'],
  },
  {
    id: 'tools',
    title: 'Ferramentas e DevOps',
    description: 'Versionamento, containers, deploy e testes automatizados.',
    items: ['Git', 'GitHub', 'Docker', 'Vercel', 'Render', 'Vitest', 'Testing Library', 'Playwright'],
  },
]

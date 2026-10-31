export interface Project {
  name: string
  summary: string
  stack?: string[]
  highlights: string[]
  demo?: string
  code: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Agendly',
    summary: 'SaaS multiempresa para gestão de agendamentos.',
    stack: ['React', 'TypeScript', 'Fastify', 'Prisma', 'PostgreSQL'],
    highlights: ['Arquitetura multi-tenant', 'Gestão de serviços e profissionais', 'Agendamentos', 'Autenticação segura'],
    demo: 'https://agendly-zeta.vercel.app',
    code: 'https://github.com/QueirozMoura/agendly',
  },
  {
    name: 'JFQ Assistência Técnica',
    summary: 'Plataforma para assistência técnica real, com serviços, agendamento e experiência de compra.',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'],
    highlights: ['Autenticação', 'Agendamentos', 'Integração com Mercado Pago', 'Checkout e webhooks'],
    demo: 'https://assistencia-tecnica-mauve.vercel.app/',
    code: 'https://github.com/QueirozMoura/assistencia-tecnica',
  },
  {
    name: 'Pulse',
    summary: 'Sistema de monitoramento e status de aplicações.',
    highlights: ['Monitoramento de serviços', 'Histórico de disponibilidade', 'Painel administrativo', 'Alertas'],
    code: 'https://github.com/QueirozMoura/pulse',
  },
  {
    name: 'SyncLab',
    summary: 'Experimento de edição colaborativa offline-first usando CRDT.',
    highlights: ['Sincronização de dados', 'Arquitetura offline-first', 'Testes automatizados'],
    demo: 'https://synclab-phi.vercel.app',
    code: 'https://github.com/QueirozMoura/synclab',
  },
]

export interface ProjectImage {
  /** Nome-base em /public/projects (gera `${base}-800.webp` e `${base}-1440.webp`). */
  base: string
  alt: string
}

export interface Project {
  name: string
  summary: string
  stack?: string[]
  highlights: string[]
  demo?: string
  code: string
  image?: ProjectImage
}

export const PROJECTS: Project[] = [
  {
    name: 'Agendly',
    summary: 'SaaS multiempresa para gestão de agendamentos.',
    stack: ['React', 'TypeScript', 'Fastify', 'Prisma', 'PostgreSQL'],
    highlights: ['Arquitetura multi-tenant', 'Gestão de serviços e profissionais', 'Agendamentos', 'Autenticação segura'],
    demo: 'https://agendly-zeta.vercel.app',
    code: 'https://github.com/QueirozMoura/agendly',
    image: {
      base: 'agendly',
      alt: 'Página inicial do Agendly com a prévia da agenda do dia: horários agendados, confirmados e cancelados.',
    },
  },
  {
    name: 'ServiceFlow',
    summary: 'Gestão de ordens de serviço, orçamentos, pagamentos e garantias para pequenas assistências técnicas.',
    stack: ['React', 'TypeScript', 'Vite', 'Fastify', 'Prisma', 'PostgreSQL'],
    highlights: [
      'SaaS multi-organização com controle de acesso por papel',
      'Sessão segura por cookie HttpOnly e login com Google',
      'Ordens de serviço, orçamentos, pagamentos e garantias',
      'Integridade financeira testada contra concorrência',
    ],
    demo: 'https://serviceflow-wine-seven.vercel.app',
    code: 'https://github.com/QueirozMoura/serviceflow',
    image: {
      base: 'serviceflow',
      alt: 'Dashboard escuro do ServiceFlow com ordens abertas, orçamentos, total recebido e fluxo das ordens de serviço.',
    },
  },
  {
    name: 'JFQ Assistência Técnica',
    summary: 'Plataforma para assistência técnica real, com serviços, agendamento e experiência de compra.',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'],
    highlights: ['Autenticação', 'Agendamentos', 'Integração com Mercado Pago', 'Checkout e webhooks'],
    demo: 'https://assistencia-tecnica-mauve.vercel.app/',
    code: 'https://github.com/QueirozMoura/assistencia-tecnica',
    image: {
      base: 'jfq',
      alt: 'Página inicial da JFQ Assistência Técnica, em azul e branco, com chamadas para comprar e agendar assistência.',
    },
  },
  {
    name: 'SyncLab',
    summary: 'Experimento de edição colaborativa offline-first usando CRDT.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Fastify', 'PostgreSQL', 'IndexedDB', 'Vitest'],
    highlights: ['Sincronização de dados', 'Arquitetura offline-first', 'Testes automatizados'],
    demo: 'https://synclab-phi.vercel.app',
    code: 'https://github.com/QueirozMoura/synclab',
    image: {
      base: 'synclab',
      alt: 'Centro de controle escuro do SyncLab, com status de sincronização, documentos recentes e linha de atividade.',
    },
  },
  {
    name: 'Garantia+',
    summary: 'Cofre fiscal que centraliza compras, documentos fiscais e garantias em um único lugar.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Vitest'],
    highlights: [
      'Compras, garantias e documentos organizados',
      'Importação de NF-e por XML',
      'Alertas de garantias próximas do vencimento',
      'Extração de dados de documentos com IA',
    ],
    demo: 'https://garantia-two.vercel.app',
    code: 'https://github.com/QueirozMoura/garantia-',
    image: {
      base: 'garantia',
      alt: 'Dashboard do Garantia+ em modo visitante, com os atalhos de compras, garantias e documentos.',
    },
  },
  {
    name: 'Pulse',
    summary: 'Sistema de monitoramento e status de aplicações.',
    stack: ['React', 'TypeScript', 'Vite', 'Fastify', 'Prisma', 'PostgreSQL'],
    highlights: ['Monitoramento de serviços', 'Histórico de disponibilidade', 'Painel administrativo', 'Alertas'],
    code: 'https://github.com/QueirozMoura/pulse',
    image: {
      base: 'pulse',
      alt: 'Página pública de status do Pulse, com o aviso de que todos os sistemas estão operacionais, o traçado de sinal e a disponibilidade em 24 horas.',
    },
  },
]

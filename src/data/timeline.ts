export interface TimelineItem {
  period: string
  role: string
  company: string
  description: string
  tags: string[]
}

export interface EducationItem {
  title: string
  description: string
}

export const timeline: TimelineItem[] = [
  {
    period: '2025 — Presente',
    role: 'Frontend & Full Stack Developer',
    company: 'TechFlow Solutions Inc.',
    description:
      'Criação de projetos web modernos utilizando tecnologias atuais, consumo de APIs e foco em performance, responsividade e experiência do usuário.',
    tags: ['AWS Lambda', 'Terraform', 'Kubernetes'],
  },
  {
    period: '2025 — Presente',
    role: 'Full Stack Freelancer',
    company: 'NeuralCore AI',
    description:
      'Desenvolvimento de soluções web para clientes independentes, incluindo consumo de APIs, criação de funcionalidades back-end, autenticação de usuários e interfaces modernas otimizadas para diferentes dispositivos.',
    tags: ['React', 'Node.js', 'Express', 'MySQL', 'REST API'],
  },
  {
    period: '2026 — Presente',
    role: 'Advanced Full Stack Developer',
    company: 'DataPrime Systems',
    description:
      'Aprofundamento em desenvolvimento Full Stack com foco em arquitetura de aplicações, integração de APIs, lógica back-end e construção de interfaces modernas orientadas à performance e escalabilidade.',
    tags: ['Next.js', 'Node.js', 'React', 'MongoDB', 'TypeScript'],
  },
]

export const education: EducationItem[] = [
  {
    title: 'Técnico Integrado em Desenvolvimento de Sistemas',
    description:
      'Formação técnica integrada ao Ensino Médio com foco em programação, desenvolvimento web, banco de dados e lógica computacional.',
  },
  {
    title: 'Análise e Desenvolvimento de Sistemas (ADS)',
    description:
      'Cursando atualmente, com foco em desenvolvimento Full Stack, arquitetura de aplicações e inteligência artificial.',
  },
]

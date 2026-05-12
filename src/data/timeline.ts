export interface TimelineItem {
  period: string
  role: string
  company: string
  description: string
  tags: string[]
}

export interface EducationItem {
  title: string
  institution?: string
  year?: string
}

export const timeline: TimelineItem[] = [
  {
    period: '2023 — Presente',
    role: 'Lead Cloud Architect',
    company: 'TechFlow Solutions Inc.',
    description:
      'Liderança técnica na migração de microsserviços para arquitetura serverless, reduzindo latência operacional em 40% e custos de nuvem em 25% através de otimização de recursos AWS.',
    tags: ['AWS Lambda', 'Terraform', 'Kubernetes'],
  },
  {
    period: '2021 — 2023',
    role: 'Senior Full-Stack Engineer',
    company: 'NeuralCore AI',
    description:
      'Desenvolvimento de interfaces de alta performance e integração de APIs de LLM para análise de dados em tempo real, atendendo mais de 1 milhão de requisições diárias.',
    tags: ['Next.js', 'Go', 'PyTorch'],
  },
  {
    period: '2019 — 2021',
    role: 'Backend Developer',
    company: 'DataPrime Systems',
    description:
      'Responsável pela manutenção de pipelines de dados ETL e refatoração de APIs legadas para Node.js, aumentando a confiabilidade do sistema para 99.9%.',
    tags: ['Node.js', 'PostgreSQL', 'Redis'],
  },
]

export const education: EducationItem[] = [
  {
    title: 'Mestrado em Engenharia de Software',
    institution: 'Universidade Tecnológica Federal',
    year: '2021',
  },
  {
    title: 'Bacharelado em Ciência da Computação',
    institution: 'Instituto de Tecnologia Avançada',
    year: '2018',
  },
  {
    title: 'Certificação AWS Solutions Architect Professional',
  },
]

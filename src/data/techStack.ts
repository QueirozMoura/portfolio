export interface TechItem {
  name: string
  category: string
  short: string
}

export const techStack: TechItem[] = [
  { name: 'JavaScript', category: 'Linguagem', short: 'JS' },
  { name: 'TypeScript', category: 'Linguagem', short: 'TS' },
  { name: 'React / Next.js', category: 'Front-end', short: 'RE' },
  { name: 'Node.js', category: 'Back-end', short: 'ND' },
  { name: 'Python', category: 'IA / Back-end', short: 'PY' },
  { name: 'Tailwind CSS', category: 'UI', short: 'TW' },
  { name: 'IA Generativa', category: 'Inteligência Artificial', short: 'AI' },
  { name: 'Vector DBs', category: 'Dados', short: 'VD' },
  { name: 'PostgreSQL', category: 'Banco de Dados', short: 'PG' },
  { name: 'Docker', category: 'Infraestrutura', short: 'DK' },
  { name: 'AWS', category: 'Cloud', short: 'AW' },
  { name: 'Git', category: 'Versionamento', short: 'GT' },
]

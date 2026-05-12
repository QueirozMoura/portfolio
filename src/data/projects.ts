export interface Project {
  title: string
  tags: string[]
  description: string
  image: string
  imageAlt: string
  demoUrl: string
  codeUrl: string
  demoTarget?: '_blank'
}

export const projects: Project[] = [
  {
    title: 'AI Weather Intelligence',
    tags: ['Next.js 14', 'IA', 'Analytics'],
    description:
      'Plataforma de previsão climática desenvolvida com integração de IA, APIs em tempo real e interfaces modernas para entregar dados meteorológicos de forma inteligente e visualmente intuitiva.',
    image: '/projeto-4.png',
    imageAlt: 'Preview do projeto AI Weather Intelligence',
    demoUrl: 'https://queirozmoura.github.io/projeto-previsao-do-tempo-com-ia-00/',
    demoTarget: '_blank',
    codeUrl: '#',
  },
  {
    title: 'User Management System',
    tags: ['Rust', 'WASM', 'Performance'],
    description:
      'Aplicação Full Stack criada para gerenciamento inteligente de usuários, utilizando consumo de APIs, arquitetura moderna e interfaces responsivas.',
    image: '/projeto-1.png',
    imageAlt: 'Preview do projeto User Management System',
    demoUrl: 'https://queirozmoura.github.io/cadastro-usuarios/',
    demoTarget: '_blank',
    codeUrl: '#',
  },
  {
    title: 'AI Translator Platform',
    tags: ['Solidity', 'Ethers.js', 'Web3'],
    description:
      'Sistema inteligente de tradução criado com tecnologias modernas, integração de APIs e interfaces responsivas para proporcionar uma experiência fluida e intuitiva.',
    image: '/projeto-2.png',
    imageAlt: 'Preview do projeto AI Translator Platform',
    demoUrl: 'https://queirozmoura.github.io/tradutor/',
    demoTarget: '_blank',
    codeUrl: '#',
  },
  {
    title: 'Neural Media Player',
    tags: ['Python', 'PyTorch', 'Computer Vision'],
    description:
      'Aplicação Front-End desenvolvida para reprodução multimídia com interface moderna, design responsivo e experiência imersiva focada em usabilidade e performance.',
    image: '/projeto-3.png',
    imageAlt: 'Preview do projeto Neural Media Player',
    demoUrl: 'https://queirozmoura.github.io/projeto-player/',
    demoTarget: '_blank',
    codeUrl: '#',
  },
]

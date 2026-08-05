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
    title: 'Assistência Técnica',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    description:
      'Sistema full stack completo para gestão de assistência técnica, com dashboard administrativo, gestão de clientes e ordens de serviço, controle de estoque e pagamentos, cadastro de técnicos, autenticação segura, área do cliente e integrações com APIs, projetado com arquitetura moderna, escalável e foco em boas práticas de segurança.',
    image: '/image.png',
    imageAlt: 'Preview do projeto Assistência Técnica',
    demoUrl: 'https://assistencia-tecnica-mauve.vercel.app',
    demoTarget: '_blank',
    codeUrl: 'https://github.com/QueirozMoura/assistencia-tecnica',
  },
]

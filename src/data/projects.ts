export interface Project {
  title: string
  tags: string[]
  description: string
  demoUrl: string
  codeUrl: string
}

export const projects: Project[] = [
  {
    title: 'NeuralFlow Dashboard',
    tags: ['Next.js 14', 'IA', 'Analytics'],
    description:
      'Plataforma de analytics preditivo em tempo real para infraestrutura cloud descentralizada, integrada com agentes LLM para resposta automatizada a incidentes.',
    demoUrl: '#',
    codeUrl: '#',
  },
  {
    title: 'VoidEngine Core',
    tags: ['Rust', 'WASM', 'Performance'],
    description:
      'Engine gráfica de alta performance compilada para WebAssembly, alcançando 60FPS em simulações complexas diretamente no navegador.',
    demoUrl: '#',
    codeUrl: '#',
  },
  {
    title: 'VaultX Protocol',
    tags: ['Solidity', 'Ethers.js', 'Web3'],
    description:
      'Agregador DeFi com foco em segurança institucional, otimização de gas e eficiência de TVL.',
    demoUrl: '#',
    codeUrl: '#',
  },
  {
    title: 'SynthVision AI',
    tags: ['Python', 'PyTorch', 'Computer Vision'],
    description:
      'Modelo de visão computacional para detecção de objetos em tempo real em ambientes de baixa luminosidade.',
    demoUrl: '#',
    codeUrl: '#',
  },
]

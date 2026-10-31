export const SITE = {
  name: 'Gustavo Moura',
  role: 'Desenvolvedor Full Stack',
  location: 'São Paulo, Brasil',
  github: 'https://github.com/QueirozMoura',
  linkedin: 'https://www.linkedin.com/in/gustavomoura-/',
  /** E-mail público de contato, informado pelo Gustavo. Vazio oculta o botão no Contato. */
  email: 'gqueiroz2008@gmail.com' as string,
}

export const NAV = [
  { id: 'hero', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'tecnologias', label: 'Tecnologias' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'contato', label: 'Contato' },
] as const

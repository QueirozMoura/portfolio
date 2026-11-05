export const SITE = {
  name: 'Gustavo Moura',
  role: 'Desenvolvedor Full Stack',
  location: 'São Paulo, Brasil',
  github: 'https://github.com/QueirozMoura',
  linkedin: 'https://www.linkedin.com/in/gustavomoura-/',
  /** E-mail público de contato, informado pelo Gustavo. Vazio oculta o botão no Contato. */
  email: 'gqueiroz2008@gmail.com' as string,
  /**
   * Caminho do currículo em PDF (ex.: '/curriculo-gustavo-moura.pdf', com o arquivo em public/).
   * Vazio = ainda não publicado: o botão "Baixar Currículo" aparece desativado.
   */
  resume: '' as string,
}

/** Ordem do menu (não precisa seguir a ordem das seções na página). */
export const NAV = [
  { id: 'hero', label: 'Início' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'tecnologias', label: 'Stack' },
  { id: 'contato', label: 'Contato' },
] as const

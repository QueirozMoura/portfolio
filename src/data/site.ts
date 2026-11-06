export const SITE = {
  name: 'Gustavo Moura',
  role: 'Desenvolvedor Full Stack',
  location: 'São Paulo, Brasil',
  github: 'https://github.com/QueirozMoura',
  linkedin: 'https://www.linkedin.com/in/gustavomoura-/',
  /** E-mail público de contato, informado pelo Gustavo. Vazio oculta o botão no Contato. */
  email: 'gqueiroz2008@gmail.com' as string,
  /**
   * Caminho do currículo em PDF (arquivo em public/), prefixado com o BASE_URL do Vite
   * para continuar válido se o site for publicado num subcaminho do GitHub Pages.
   * Vazio = ainda não publicado: o botão "Baixar Currículo" aparece desativado.
   */
  resume: `${import.meta.env.BASE_URL}Curriculo_Gustavo_Moura.pdf` as string,
}

/** Ordem do menu (não precisa seguir a ordem das seções na página). */
export const NAV = [
  { id: 'hero', label: 'Início' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'tecnologias', label: 'Stack' },
  { id: 'contato', label: 'Contato' },
] as const

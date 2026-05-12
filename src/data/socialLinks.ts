export type SocialLinkType = 'external' | 'email' | 'whatsapp' | 'calendly'

export interface SocialLink {
  label: string
  href: string
  type: SocialLinkType
  icon: 'github' | 'linkedin' | 'mail' | 'message-circle' | 'calendar'
  showInHeaderDesktop?: boolean
  showInMobileMenu?: boolean
  showInFooter?: boolean
}

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/seu-usuario',
    type: 'external',
    icon: 'github',
    showInHeaderDesktop: true,
    showInMobileMenu: true,
    showInFooter: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/seu-usuario',
    type: 'external',
    icon: 'linkedin',
    showInHeaderDesktop: true,
    showInMobileMenu: true,
    showInFooter: true,
  },
  {
    label: 'Email',
    href: 'mailto:contato@devengine.sh',
    type: 'email',
    icon: 'mail',
    showInHeaderDesktop: true,
    showInMobileMenu: true,
    showInFooter: true,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/5500000000000',
    type: 'whatsapp',
    icon: 'message-circle',
    showInHeaderDesktop: true,
    showInMobileMenu: true,
    showInFooter: false,
  },
]

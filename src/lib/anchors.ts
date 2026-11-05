import { useEffect } from 'react'
import { MOBILE_FACTOR } from '../config/scenes'
import type { MotionMode } from './capabilities'

/**
 * Âncoras em cenas pinadas: o topo da seção é o progresso 0. Algumas cenas só mostram o conteúdo
 * útil depois de um trecho de scroll; aqui definimos, em vh autorados, onde o link deve pousar.
 */
const LANDING_VH: Record<string, number> = {
  // vazio: o Contato deixou de ser uma cena pinada, então todas as âncoras pousam no topo da seção
}

export function useAnchorLanding(mode: MotionMode, compact: boolean) {
  useEffect(() => {
    if (mode !== 'sequence') return
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
      const id = a?.getAttribute('href')?.slice(1)
      const vh = id ? LANDING_VH[id] : undefined
      const el = id ? document.getElementById(id) : null
      if (!id || vh === undefined || !el) return
      e.preventDefault()
      const k = compact ? MOBILE_FACTOR : 1
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + vh * k * window.innerHeight)
      history.pushState(null, '', `#${id}`)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [mode, compact])
}

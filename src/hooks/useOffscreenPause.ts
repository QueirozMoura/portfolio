import { useEffect } from 'react'

/**
 * Pausa as animações ambientes (.fx) das seções fora da tela: um único IntersectionObserver marca a seção
 * com data-offscreen e o CSS aplica animation-play-state: paused. Escreve direto no DOM (sem estado React),
 * então não há re-render nem divergência com o HTML pré-renderizado.
 */
export function useOffscreenPause(selector = '[data-ambient]') {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(selector)
    if (!els.length || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) delete (e.target as HTMLElement).dataset.offscreen
          else (e.target as HTMLElement).dataset.offscreen = ''
        }
      },
      { rootMargin: '10% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [selector])
}

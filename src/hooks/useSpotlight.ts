import { useEffect, useRef } from 'react'

/**
 * Iluminação que segue o cursor nos cards. Um listener por grade (delegação), só em dispositivos com mouse;
 * grava a posição do cursor em --mx/--my no card sob o ponteiro, no máximo uma vez por quadro
 * (requestAnimationFrame só agrupa eventos, não há loop contínuo). O desenho é todo CSS.
 */
export function useSpotlight<T extends HTMLElement>(cardSelector: string) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const root = ref.current
    if (!root || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let raf = 0
    let card: HTMLElement | null = null
    let x = 0
    let y = 0
    const apply = () => {
      raf = 0
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${(x - r.left).toFixed(0)}px`)
      card.style.setProperty('--my', `${(y - r.top).toFixed(0)}px`)
    }
    const onMove = (e: PointerEvent) => {
      // ao rolar, o navegador reenvia o movimento do mouse com as mesmas coordenadas (para atualizar o :hover);
      // ignorá-lo evita repintar a luz do card a cada quadro da rolagem
      if (e.clientX === x && e.clientY === y) return
      card = (e.target as Element).closest<HTMLElement>(cardSelector)
      x = e.clientX
      y = e.clientY
      if (card && !raf) raf = requestAnimationFrame(apply)
    }
    root.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      root.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [cardSelector])
  return ref
}

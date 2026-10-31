import { useEffect } from 'react'
import { gsap } from './gsap'

/**
 * Governador de desempenho (só celular/pouca memória). Mede o tempo dos quadros enquanto o usuário rola;
 * se o aparelho não sustenta ~24 fps em duas janelas seguidas, entra no modo "lite":
 * sem mistura entre frames, amostragem mais barata do canvas e sem backdrop-filter.
 * A experiência continua a mesma (mesmas cenas, mesmos frames) — só o acabamento mais caro sai.
 * Não depende de userAgent nem de largura de tela: decide pelo que o aparelho realmente entrega.
 */
let lite = false
const listeners = new Set<() => void>()

export const isLite = () => lite
export const onLiteChange = (fn: () => void) => {
  listeners.add(fn)
  return () => void listeners.delete(fn)
}

function enterLite() {
  if (lite) return
  lite = true
  document.documentElement.dataset.perf = 'lite'
  listeners.forEach((fn) => fn())
}

const WINDOW = 40 // quadros por janela de medição
const SLOW_MS = 42 // média acima disto ≈ abaixo de 24 fps

export function usePerfGovernor(enabled: boolean) {
  useEffect(() => {
    if (!enabled || lite) return
    let lastScroll = 0
    let prev = 0
    let sum = 0
    let n = 0
    let slowWindows = 0
    const onScroll = () => (lastScroll = performance.now())
    const tick = () => {
      const now = performance.now()
      const dt = prev ? now - prev : 0
      prev = now
      // só conta quadros durante rolagem ativa; ignora pausas e abas em segundo plano (dt enorme)
      if (now - lastScroll > 250 || dt <= 0 || dt > 250) {
        sum = n = 0
        return
      }
      sum += dt
      if (++n < WINDOW) return
      slowWindows = sum / n > SLOW_MS ? slowWindows + 1 : 0
      sum = n = 0
      if (slowWindows >= 2) enterLite()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    gsap.ticker.add(tick)
    return () => {
      window.removeEventListener('scroll', onScroll)
      gsap.ticker.remove(tick)
    }
  }, [enabled])
}

export type MotionMode = 'sequence' | 'static'
/** d = 1920 nativo (desktop/tablet) · t = 1280 (celulares ou pouca memória) */
export type FrameProfile = 'd' | 't'

interface NavigatorHints {
  deviceMemory?: number
  connection?: { saveData?: boolean }
}

/** Decide se a experiência scroll-driven roda ou se usamos o fallback estático. */
export function detectMotionMode(): MotionMode {
  if (typeof window === 'undefined') return 'static'
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'static'
  const nav = navigator as Navigator & NavigatorHints
  if (nav.connection?.saveData) return 'static'
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) return 'static'
  if (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 2) return 'static'
  if (typeof createImageBitmap !== 'function') return 'static'
  return 'sequence'
}

/** Telas pequenas: o dedo percorre mais por gesto, então a faixa de scroll é encurtada (ver MOBILE_FACTOR). */
export function detectCompact(): boolean {
  return window.matchMedia('(max-width: 1023px)').matches
}

/**
 * Perfil de frames. Desktop e tablet (≥768px) recebem a resolução nativa; só celulares
 * ou aparelhos com pouca memória usam a sequência 1280×720.
 */
export function detectProfile(): FrameProfile {
  const nav = navigator as Navigator & NavigatorHints
  const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 4
  const phone = window.matchMedia('(max-width: 767px)').matches
  return phone || lowMemory ? 't' : 'd'
}

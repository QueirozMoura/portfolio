export type MotionMode = 'sequence' | 'static'
/**
 * d = 1920 nativo (desktop/tablet) · t = 1280 (celular em paisagem ou pouca memória)
 * m = recorte retrato 450×800 (celular em pé: só a região que o "cover" mostraria, ~1/3 dos pixels)
 * p = recorte retrato nativo 608×1080 (tablet em pé)
 */
export type FrameProfile = 'd' | 't' | 'm' | 'p'

interface NavigatorHints {
  deviceMemory?: number
  connection?: { saveData?: boolean; effectiveType?: string }
}

/** Decide se a experiência scroll-driven roda ou se usamos o fallback estático. */
export function detectMotionMode(): MotionMode {
  if (typeof window === 'undefined') return 'static'
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'static'
  const nav = navigator as Navigator & NavigatorHints
  if (nav.connection?.saveData) return 'static'
  if (nav.connection?.effectiveType === 'slow-2g' || nav.connection?.effectiveType === '2g') return 'static'
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) return 'static'
  if (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 2) return 'static'
  if (typeof createImageBitmap !== 'function') return 'static'
  return 'sequence'
}

/** Telas pequenas: o dedo percorre mais por gesto, então a faixa de scroll é encurtada (ver MOBILE_FACTOR). */
export function detectCompact(): boolean {
  return window.matchMedia('(max-width: 1023px)').matches
}

/** Celular de verdade (toque + lado menor da tela ≤ 600 px), independente de a janela estar em pé ou deitada. */
export function isPhone(): boolean {
  const small = Math.min(window.screen.width, window.screen.height) <= 600
  return small && window.matchMedia('(pointer: coarse)').matches
}

/**
 * Perfil de frames. Celular em pé recebe o recorte retrato (m); deitado, 1280×720 (t).
 * Tablet e desktop recebem a resolução nativa, salvo pouca memória.
 */
export function detectProfile(): FrameProfile {
  const nav = navigator as Navigator & NavigatorHints
  const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory < 4
  if (isPhone() || window.matchMedia('(max-width: 767px)').matches) {
    return window.matchMedia('(orientation: portrait)').matches ? 'm' : 't'
  }
  const touchTabletPortrait =
    window.matchMedia('(pointer: coarse)').matches &&
    window.matchMedia('(orientation: portrait)').matches &&
    window.matchMedia('(max-width: 1100px)').matches
  if (touchTabletPortrait) return 'p'
  return lowMemory ? 't' : 'd'
}

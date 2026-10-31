/**
 * Ritmo da experiência — único lugar para ajustar durações.
 * Todas as medidas são em "alturas de viewport" (1 = uma tela de scroll).
 */
export const SCENE_IDS = ['hero', 'sobre', 'tecnologias', 'projetos', 'contato'] as const
export type SceneId = (typeof SCENE_IDS)[number]

interface SceneConfig {
  /** Distância de scroll em que a cena fica fixa, do 1º pixel até ser liberada. */
  scroll: number
  /** A próxima cena sobe e faz crossfade sobre os últimos CROSSFADE vh desta. */
  tail: boolean
}

export const SCENES: Record<SceneId, SceneConfig> = {
  hero: { scroll: 3.5, tail: true },
  sobre: { scroll: 4.0, tail: true },
  tecnologias: { scroll: 4.5, tail: true },
  projetos: { scroll: 3.5, tail: false }, // depois dela vêm os cards, rolagem livre
  contato: { scroll: 3.5, tail: false },
}

/** Quanto scroll dura o crossfade entre uma cena e a seguinte. */
export const CROSSFADE = 1
/** Pausa de contemplação: o último frame fica parado por este tanto antes da cena acabar. */
export const HOLD_END = 0.5
/** Em telas pequenas o dedo percorre mais por gesto; encurta a duração. */
export const MOBILE_FACTOR = 0.85
/** Suavização do scroll (1/s). Maior = mais responsivo, menor = mais "cinema". */
export const SMOOTHING = 9
/** Se o salto de progresso for maior que isto (ex.: clique na navbar), não interpola. */
export const SNAP_DISTANCE = 0.35

export interface Timing {
  /** Duração real da cena em vh (já com o fator mobile). */
  scroll: number
  /**
   * Converte vh AUTORADOS (pensados para desktop) em fração de progresso 0–1.
   * No mobile os tempos encolhem junto com a cena, então a proporção de leitura se mantém.
   */
  at: (vh: number) => number
  /** Início da transição para a próxima cena (ou o fim), em vh autorados — use com `at`. */
  tailStart: number
  /** Fração de progresso em que o último frame é atingido. */
  frameEnd: number
}

export function getTiming(id: SceneId, compact: boolean): Timing {
  const cfg = SCENES[id]
  const k = compact ? MOBILE_FACTOR : 1
  const scroll = cfg.scroll * k
  const tailStartReal = cfg.tail ? scroll - CROSSFADE : scroll
  const frameEndVh = scroll - (cfg.tail ? CROSSFADE * HOLD_END : HOLD_END)
  return { scroll, at: (vh) => (vh * k) / scroll, tailStart: tailStartReal / k, frameEnd: frameEndVh / scroll }
}

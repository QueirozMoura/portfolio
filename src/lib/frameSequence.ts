import type { FrameProfile } from './capabilities'
import manifest from '../generated/frames.json'

interface ProfileInfo {
  count: number
  width: number
  height: number
}
type Manifest = Record<string, Partial<Record<FrameProfile, ProfileInfo>>>

interface Limits {
  /** Orçamento de memória para frames decodificados (RGBA). 1920×1080 = ~8,3 MB · 1280×720 = ~3,7 MB · 450×800 = ~1,4 MB. */
  bytes: number
  /** Downloads simultâneos. */
  fetch: number
  /** Decodificações simultâneas (createImageBitmap é caro; em celular, poucas por vez). */
  decode: number
  /** Janela decodificada em volta do frame atual. */
  radius: number
}
const MB = 1024 * 1024
const LIMITS: Record<FrameProfile, Limits> = {
  d: { bytes: 220 * MB, fetch: 6, decode: 16, radius: 3 }, // desktop/tablet: comportamento original
  t: { bytes: 64 * MB, fetch: 4, decode: 3, radius: 3 },
  m: { bytes: 20 * MB, fetch: 3, decode: 2, radius: 2 },
  p: { bytes: 56 * MB, fetch: 4, decode: 3, radius: 2 }, // 608×1080 = ~2,6 MB por frame
}
const MIN_KEEP = 8

const pad = (n: number) => String(n).padStart(4, '0')

/**
 * Sequência de frames de uma seção.
 * - Blobs comprimidos (WebP) ficam em memória; ImageBitmaps decodificados ficam num LRU
 *   limitado por bytes e são descartados com release().
 * - Carregamento em duas passadas: grosseira (1 a cada 4 frames, ao entrar na zona de pré-carga)
 *   e fina (o restante, só quando a cena está perto do viewport).
 */
export class FrameSequence {
  readonly count: number
  readonly width: number
  readonly height: number
  private blobs = new Map<number, Blob>()
  private bitmaps = new Map<number, ImageBitmap>() // ordem de inserção = LRU
  private bitmapBytes = 0
  private pending = new Set<number>()
  private decoding = new Set<number>()
  private queue: number[] = []
  private aborts = new Map<number, AbortController>()
  private center = 0
  private readonly lim: Limits
  private active = 0
  private coarseQueued = false
  private fineQueued = false
  private failed = new Set<number>()
  onProgress?: () => void

  constructor(readonly id: string, readonly profile: FrameProfile) {
    const info = (manifest as Manifest)[id]?.[profile]
    if (!info) throw new Error(`Sem frames para ${id}/${profile} — rode "npm run frames"`)
    this.count = info.count
    this.width = info.width
    this.height = info.height
    this.lim = LIMITS[profile]
  }

  /** Frames já decodificados e vivos (diagnóstico). */
  get liveBitmaps() {
    return this.bitmaps.size
  }

  private isCoarse(i: number) {
    return i % 4 === 0 || i === this.count - 1
  }

  private url(i: number) {
    return `/frames/${this.id}/${this.profile}/${pad(i + 1)}.webp`
  }

  /** Passada grosseira: dá um esboço navegável da cena inteira. Idempotente. */
  startCoarse() {
    if (this.coarseQueued) return
    this.coarseQueued = true
    for (let i = 0; i < this.count; i++) if (this.isCoarse(i)) this.queue.push(i)
    this.pump()
  }

  /** Passada fina: o restante dos frames. Idempotente. */
  startFine() {
    this.startCoarse()
    if (this.fineQueued) return
    this.fineQueued = true
    for (let i = 0; i < this.count; i++) if (!this.isCoarse(i)) this.queue.push(i)
    this.pump()
  }

  /** Prioriza frames próximos de `index` (onde o usuário está rolando). */
  prioritize(index: number, span = 8) {
    const want: number[] = []
    for (let k = 0; k <= span; k++) {
      for (const i of [index + k, index - k]) {
        if (i >= 0 && i < this.count && !this.blobs.has(i) && !this.pending.has(i) && !this.failed.has(i)) want.push(i)
      }
    }
    if (!want.length) return
    const w = new Set(want)
    this.queue = [...want, ...this.queue.filter((q) => !w.has(q))]
    this.pump()
  }

  private pump() {
    while (this.active < this.lim.fetch && this.queue.length) {
      const i = this.queue.shift()!
      if (this.blobs.has(i) || this.pending.has(i) || this.failed.has(i)) continue
      this.pending.add(i)
      this.active++
      const ac = new AbortController()
      this.aborts.set(i, ac)
      fetch(this.url(i), { signal: ac.signal })
        .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
        .then((b) => {
          this.blobs.set(i, b)
          this.onProgress?.()
        })
        .catch((e) => {
          if (!(e instanceof DOMException && e.name === 'AbortError')) this.failed.add(i) // cancelado ≠ falha: pode ser pedido de novo
        })
        .finally(() => {
          this.pending.delete(i)
          this.aborts.delete(i)
          this.active--
          this.pump()
        })
    }
  }

  get loadedRatio() {
    return this.blobs.size / this.count
  }

  hasAny() {
    return this.blobs.size > 0
  }

  /**
   * Mantém decodificada uma janela ao redor de `index`, do mais próximo ao mais distante, respeitando o teto
   * de decodificações simultâneas. Nada fica enfileirado: a cada chamada recalcula o que ainda importa,
   * então um pedido obsoleto nunca ocupa a vez de um frame útil.
   */
  decodeAround(index: number, dir = 0) {
    this.center = index
    const r = this.lim.radius
    // em celular, a janela é direcional: mais à frente de quem rola, pouco atrás (frames que já passaram não voltam tão cedo)
    const ahead = this.lim.decode < 16 && dir !== 0 ? r + 1 : r
    const behind = this.lim.decode < 16 && dir !== 0 ? 1 : r
    this.decode(index)
    for (let k = 1; k <= Math.max(ahead, behind); k++) {
      if (k <= ahead) this.decode(index + dir * k || index + k)
      if (k <= behind) this.decode(index - (dir || 1) * k)
    }
  }

  private decode(i: number) {
    if (i < 0 || i >= this.count || this.bitmaps.has(i)) return
    const blob = this.blobs.get(i)
    if (!blob || this.decoding.has(i) || this.decoding.size >= this.lim.decode) return
    this.decoding.add(i)
    createImageBitmap(blob, { premultiplyAlpha: 'none', colorSpaceConversion: 'none' })
      .then((bmp) => {
        // chegou tarde demais (o usuário já rolou para longe): descarta sem ocupar memória
        if (!this.alive || Math.abs(i - this.center) > this.lim.radius + 4) {
          bmp.close()
          return
        }
        this.bitmaps.set(i, bmp)
        this.bitmapBytes += bmp.width * bmp.height * 4
        this.evict()
        this.onProgress?.()
      })
      .catch(() => this.failed.add(i))
      .finally(() => this.decoding.delete(i))
  }

  /** Acima do orçamento, descarta o frame mais distante da posição atual (não o mais antigo). */
  private evict() {
    while (this.bitmapBytes > this.lim.bytes && this.bitmaps.size > MIN_KEEP) {
      let far = -1
      let farD = -1
      for (const k of this.bitmaps.keys()) {
        const d = Math.abs(k - this.center)
        if (d > farD) {
          farD = d
          far = k
        }
      }
      const b = this.bitmaps.get(far)!
      this.bitmapBytes -= b.width * b.height * 4
      b.close()
      this.bitmaps.delete(far)
    }
  }

  /** Bitmap exato, ou o decodificado mais próximo (evita tela vazia/flicker ao rolar rápido). */
  bitmapNear(i: number): ImageBitmap | null {
    const exact = this.bitmaps.get(i)
    if (exact) return exact
    let best: ImageBitmap | null = null
    let bestD = Infinity
    for (const [k, b] of this.bitmaps) {
      const d = Math.abs(k - i)
      if (d < bestD) {
        bestD = d
        best = b
      }
    }
    return best
  }

  exact(i: number) {
    return this.bitmaps.get(i) ?? null
  }

  /** Cena saiu de perto do viewport: cancela downloads da passada fina (a grosseira, leve, continua). */
  cancelFine() {
    this.queue = this.queue.filter((i) => this.isCoarse(i))
    this.fineQueued = false
    for (const [i, ac] of this.aborts) if (!this.isCoarse(i)) ac.abort()
  }

  /** Libera bitmaps decodificados (cena longe do viewport). Os blobs permanecem. */
  release() {
    for (const b of this.bitmaps.values()) b.close()
    this.bitmaps.clear()
    this.bitmapBytes = 0
  }

  private alive = true

  dispose() {
    this.alive = false
    for (const ac of this.aborts.values()) ac.abort()
    this.release()
    this.blobs.clear()
    this.queue = []
  }
}

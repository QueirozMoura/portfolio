import type { FrameProfile } from './capabilities'
import manifest from '../generated/frames.json'

interface ProfileInfo {
  count: number
  width: number
  height: number
}
type Manifest = Record<string, Partial<Record<FrameProfile, ProfileInfo>>>

/** Orçamento de memória para frames decodificados (RGBA). Frames de 1920×1080 pesam ~8,3 MB cada. */
const MAX_BITMAP_BYTES = 220 * 1024 * 1024
const MAX_CONCURRENT_FETCH = 6

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
  }

  private url(i: number) {
    return `/frames/${this.id}/${this.profile}/${pad(i + 1)}.webp`
  }

  /** Passada grosseira: dá um esboço navegável da cena inteira. Idempotente. */
  startCoarse() {
    if (this.coarseQueued) return
    this.coarseQueued = true
    for (let i = 0; i < this.count; i++) if (i % 4 === 0 || i === this.count - 1) this.queue.push(i)
    this.pump()
  }

  /** Passada fina: o restante dos frames. Idempotente. */
  startFine() {
    this.startCoarse()
    if (this.fineQueued) return
    this.fineQueued = true
    for (let i = 0; i < this.count; i++) if (!(i % 4 === 0 || i === this.count - 1)) this.queue.push(i)
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
    this.queue = [...want, ...this.queue.filter((q) => !want.includes(q))]
    this.pump()
  }

  private pump() {
    while (this.active < MAX_CONCURRENT_FETCH && this.queue.length) {
      const i = this.queue.shift()!
      if (this.blobs.has(i) || this.pending.has(i) || this.failed.has(i)) continue
      this.pending.add(i)
      this.active++
      fetch(this.url(i))
        .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(String(r.status)))))
        .then((b) => {
          this.blobs.set(i, b)
          this.onProgress?.()
        })
        .catch(() => this.failed.add(i)) // o frame mais próximo cobre a falha; não trava a cena
        .finally(() => {
          this.pending.delete(i)
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

  /** Decodifica (se necessário) os frames de uma janela ao redor de `index`. */
  decodeAround(index: number, radius = 4) {
    for (let k = 0; k <= radius; k++) {
      for (const i of [index + k, index - k]) this.decode(i)
    }
  }

  private decode(i: number) {
    if (i < 0 || i >= this.count) return
    const hit = this.bitmaps.get(i)
    if (hit) {
      this.bitmaps.delete(i) // toca no LRU
      this.bitmaps.set(i, hit)
      return
    }
    const blob = this.blobs.get(i)
    if (!blob || this.decoding.has(i)) return
    this.decoding.add(i)
    createImageBitmap(blob, { premultiplyAlpha: 'none', colorSpaceConversion: 'none' })
      .then((bmp) => {
        this.bitmaps.set(i, bmp)
        this.bitmapBytes += bmp.width * bmp.height * 4
        while (this.bitmapBytes > MAX_BITMAP_BYTES && this.bitmaps.size > 12) {
          const oldest = this.bitmaps.keys().next().value as number
          const b = this.bitmaps.get(oldest)!
          this.bitmapBytes -= b.width * b.height * 4
          b.close()
          this.bitmaps.delete(oldest)
        }
        this.onProgress?.()
      })
      .catch(() => this.failed.add(i))
      .finally(() => this.decoding.delete(i))
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

  /** Libera bitmaps decodificados (cena longe do viewport). Os blobs permanecem. */
  release() {
    for (const b of this.bitmaps.values()) b.close()
    this.bitmaps.clear()
    this.bitmapBytes = 0
  }

  dispose() {
    this.release()
    this.blobs.clear()
    this.queue = []
  }
}

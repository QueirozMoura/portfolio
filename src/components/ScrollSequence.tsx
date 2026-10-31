import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { FrameSequence } from '../lib/frameSequence'
import { useMotion } from '../lib/motion-context'
import { isLite, onLiteChange } from '../lib/perf'
import { isPhone } from '../lib/capabilities'

interface Props {
  id: string
  /** Progresso 0–1 da cena, atualizado pelo ScrollTrigger (sem re-render do React). */
  progressRef: React.MutableRefObject<number>
  /** Posição horizontal do foco ao recortar (0 esquerda · 1 direita). */
  focusX?: number
  /** Fração do progresso em que o último frame é atingido (depois disso, pausa). */
  frameEnd: number
  /** Quando true, começa a baixar os frames (cena atual ou a próxima). */
  load: boolean
  /** Quando true, a cena está perto do viewport e deve renderizar. */
  active: boolean
  className?: string
}

/** Canvas 2D que exibe o frame correspondente ao progresso de scroll, com blend entre frames. */
export function ScrollSequence({ id, progressRef, frameEnd, focusX: focusProp = 0.5, load, active, className }: Props) {
  const { profile } = useMotion()
  // o perfil "m" já vem recortado no foco da cena: aqui só centraliza
  const focusX = profile === 'm' || profile === 'p' ? 0.5 : focusProp
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const seqRef = useRef<FrameSequence | null>(null)
  const [ready, setReady] = useState(false)
  const activeRef = useRef(active)

  const resizeRef = useRef<() => void>(() => {})
  const paintRef = useRef<() => void>(() => {})
  useEffect(() => {
    activeRef.current = active
    if (!active) {
      seqRef.current?.cancelFine()
      seqRef.current?.release()
    }
    resizeRef.current() // cenas inativas devolvem a memória do canvas; ao voltar, recria na resolução certa
  }, [active])

  useEffect(() => {
    const seq = new FrameSequence(id, profile)
    seqRef.current = seq
    return () => {
      seq.dispose()
      seqRef.current = null
    }
  }, [id, profile])

  useEffect(() => {
    if (load) seqRef.current?.startCoarse()
  }, [load, id, profile])

  useEffect(() => {
    if (active) seqRef.current?.startFine()
  }, [active, id, profile])

  useEffect(() => {
    const canvas = canvasRef.current
    const seq = seqRef.current
    if (!canvas || !seq) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let w = 0
    let h = 0
    let last = -1
    let lastIdx = -1
    let kick = true // chegou frame novo: reavalia a janela de decodificação
    let dir = 0
    let lastPaintAt = 0
    let lite = isLite()
    const minPaintGap = () => (profile === 'd' ? 0 : lite ? 45 : 30)
    let dirty = true
    let shown = false

    const resize = () => {
      if (!activeRef.current) {
        // inativa: libera o backing store (a imagem some junto, mas a cena está fora da tela)
        if (canvas.width > 1) {
          canvas.width = 1
          canvas.height = 1
        }
        return
      }
      const cw = canvas.clientWidth
      const ch = canvas.clientHeight
      // CSS px por px de frame no recorte "cover"; 1/c = escala de dispositivo útil (mais que isso não revela detalhe)
      const c = Math.max(cw / seq.width, ch / seq.height)
      const dpr = window.devicePixelRatio || 1
      const f = Math.min(isPhone() ? 1 : dpr, Math.max(1, 1 / c)) // celular: canvas em px CSS (sem 2–3× de DPR)
      // modo lite (aparelho sem fôlego): canvas a 80% — o CSS estica; custo de preenchimento cai ~36%
      const scale = lite && profile !== 'd' ? 0.8 : 1
      let tw = Math.round(cw * f * scale)
      let th = Math.round(ch * f * scale)
      const MAX_SIDE = 3072 // teto de memória do canvas (~25 MB)
      const k = Math.min(1, MAX_SIDE / Math.max(tw, th))
      tw = Math.round(tw * k)
      th = Math.round(th * k)
      if (canvas.width !== tw || canvas.height !== th) {
        canvas.width = tw
        canvas.height = th
        // bitmaps antigos ainda servem (são do frame, não do canvas); só força redesenho
      }
      w = tw
      h = th
      ctx.imageSmoothingEnabled = true
      // celular/tablet reduzidos: amostragem barata; desktop mantém a qualidade máxima
      ctx.imageSmoothingQuality = profile === 'd' ? 'high' : lite ? 'low' : 'medium'
      dirty = true
      paintRef.current() // repinta já neste frame: redimensionar limpa o canvas e evita piscar
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resizeRef.current = resize
    resize()
    seq.onProgress = () => {
      dirty = true
      kick = true
    }
    const offLite = onLiteChange(() => {
      lite = isLite()
      resize()
    })

    const draw = (bmp: ImageBitmap, alpha: number) => {
      const s = Math.max(w / bmp.width, h / bmp.height)
      const dw = bmp.width * s
      const dh = bmp.height * s
      ctx.globalAlpha = alpha
      ctx.drawImage(bmp, (w - dw) * focusX, (h - dh) / 2, dw, dh)
    }

    let pos = 0
    /** Desenha o frame atual (e o seguinte, em blend) no canvas. */
    const paint = () => {
      if (!seq.hasAny() || w <= 1) return
      // lite: sem mistura entre dois frames (metade das chamadas drawImage); escolhe o mais próximo
      const i0 = lite ? Math.round(pos) : Math.floor(pos)
      const t = lite ? 0 : pos - i0
      const a = seq.bitmapNear(i0)
      if (!a) return
      dirty = false
      ctx.globalCompositeOperation = 'source-over'
      draw(a, 1)
      const i1 = Math.min(i0 + 1, seq.count - 1)
      const b = t > 0.03 && i1 !== i0 ? seq.exact(i1) : null
      if (b) draw(b, t)
      else if (t > 0.03 && i1 !== i0) dirty = true // aguarda o próximo frame decodificar
      ctx.globalAlpha = 1
      if (!shown) {
        shown = true
        setReady(true)
      }
    }
    paintRef.current = paint

    const tick = () => {
      if (!activeRef.current) return
      // o progresso já chega suavizado do Scene (um único sistema de suavização)
      const current = Math.min(1, progressRef.current / frameEnd)
      if (current !== last) {
        last = current
        dirty = true
      }
      pos = current * (seq.count - 1)
      // só reavalia download/decodificação quando o frame muda ou chega algo novo (não a cada quadro)
      const idx = Math.floor(pos)
      if (idx !== lastIdx || kick) {
        if (idx !== lastIdx) dir = Math.sign(idx - lastIdx)
        lastIdx = idx
        kick = false
        seq.prioritize(idx, 6)
        seq.decodeAround(idx, dir)
      }
      if (dirty) {
        // os vídeos-fonte têm 10–15 fps: no celular, repintar o canvas a 60 Hz só gasta GPU. ~30 Hz (20 Hz no lite);
        // o último frame sempre é pintado porque `dirty` permanece até o repaint. Desktop: sem limite.
        const now = performance.now()
        const gap = minPaintGap()
        if (gap === 0 || now - lastPaintAt >= gap) {
          lastPaintAt = now
          paint()
        }
      }
    }
    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      ro.disconnect()
      offLite()
      seq.onProgress = undefined
    }
  }, [id, profile, focusX, frameEnd, progressRef])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ opacity: ready ? 1 : 0, transition: 'opacity 700ms ease-out' }}
    />
  )
}

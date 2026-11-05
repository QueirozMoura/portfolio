/**
 * Camadas de atmosfera (puramente decorativas, ignoradas por leitores de tela e sem capturar cliques).
 * Tudo é CSS: gradientes estáticos movidos só por transform/opacity, executados pelo compositor.
 * As animações ficam pausadas quando a seção sai da tela (ver useOffscreenPause) e somem com prefers-reduced-motion.
 */
import type { CSSProperties } from 'react'

/** Aurora: manchas de luz azul (gradiente radial estático) que derivam lentamente — 3 na Hero, 2 no Contato. */
export function Aurora({ variant }: { variant: 'hero' | 'contact' }) {
  return (
    <div className={`aurora aurora-${variant} fx`} aria-hidden="true">
      <span className="aurora-blob aurora-blob-1 fx" />
      <span className="aurora-blob aurora-blob-2 fx" />
      {variant === 'hero' && <span className="aurora-blob aurora-blob-3 fx" />}
    </div>
  )
}

/** Gerador pseudoaleatório determinístico: o HTML pré-renderizado e o cliente geram as mesmas partículas (hidratação). */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface Particle {
  style: CSSProperties
}

function makeParticles(count: number, seed: number): Particle[] {
  const rnd = mulberry32(seed)
  const r = (min: number, max: number, digits = 1) => +(min + rnd() * (max - min)).toFixed(digits)
  return Array.from({ length: count }, (_, i) => {
    // distribuição natural: grade jitterizada (evita aglomerados e buracos grandes)
    const cols = 6
    const x = ((i % cols) + rnd()) * (100 / cols)
    const y = (Math.floor(i / cols) + rnd()) * (100 / Math.ceil(count / cols))
    const big = rnd() < 0.22 // poucas partículas maiores, com halo
    return {
      style: {
        '--x': `${x.toFixed(1)}%`,
        '--y': `${y.toFixed(1)}%`,
        '--s': `${big ? r(4, 6.5) : r(1.5, 3)}px`,
        '--o': r(big ? 0.35 : 0.25, big ? 0.6 : 0.7, 2),
      } as CSSProperties,
    }
  })
}

const SETS = { hero: makeParticles(15, 7), contact: makeParticles(12, 23) }
const GROUPS = { hero: 3, contact: 2 }

/**
 * Campo discreto de partículas. As partículas ficam paradas dentro de 2–3 grupos (camadas de profundidade), e só os
 * grupos se movem: cada animação ativa custa um recálculo de estilo por quadro durante a rolagem, então animar
 * 3 grupos em vez de 15 partículas reduz esse custo ~5× sem perder o movimento (os grupos derivam em ritmos diferentes).
 */
export function Particles({ variant }: { variant: 'hero' | 'contact' }) {
  const n = GROUPS[variant]
  const groups = Array.from({ length: n }, (_, g) => SETS[variant].filter((_, i) => i % n === g))
  return (
    <div className={`particles particles-${variant}`} aria-hidden="true">
      {groups.map((items, g) => (
        <span key={g} className={`pgroup pgroup-${g + 1} fx`}>
          {items.map((p, i) => (
            <span key={i} className="particle" style={p.style} />
          ))}
        </span>
      ))}
    </div>
  )
}

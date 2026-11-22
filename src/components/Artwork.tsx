import type { CSSProperties } from 'react'

interface ArtworkProps {
  palette: [string, string]
  title: string
  variant?: 'poster' | 'wide'
  showTitle?: boolean
  className?: string
}

function hashText(value: string): number {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return Math.abs(hash)
}

/**
 * Arte cinematográfica gerada por título: gradientes, feixes de luz e grade
 * em perspectiva. Mantém o app 100% offline, sem depender de imagens externas.
 */
export default function Artwork({
  palette,
  title,
  variant = 'poster',
  showTitle = true,
  className = '',
}: ArtworkProps) {
  const seed = hashText(title)
  const style = {
    '--art-primary': palette[0],
    '--art-secondary': palette[1],
    '--art-x1': `${10 + (seed % 46)}%`,
    '--art-y1': `${8 + ((seed >> 3) % 38)}%`,
    '--art-x2': `${52 + ((seed >> 5) % 42)}%`,
    '--art-y2': `${44 + ((seed >> 7) % 44)}%`,
    '--art-angle': `${(seed % 70) - 35}deg`,
    '--art-spark': `${18 + ((seed >> 9) % 60)}%`,
  } as CSSProperties

  return (
    <div className={`art art--${variant} ${className}`.trim()} style={style} aria-hidden="true">
      <span className="art__glow art__glow--a" />
      <span className="art__glow art__glow--b" />
      <span className="art__beam" />
      <span className="art__grid" />
      <span className="art__spark" />
      {showTitle && (
        <span className="art__label">
          <span className="art__kicker">ORION+ ORIGINAL</span>
          <span className="art__title">{title}</span>
        </span>
      )}
    </div>
  )
}

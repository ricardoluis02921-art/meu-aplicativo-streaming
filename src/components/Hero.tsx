import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMyList } from '../hooks/useMyList'
import type { TitleDetail } from '../types'
import Artwork from './Artwork'
import { IconCheck, IconInfo, IconPlay, IconPlus, IconStar } from './Icons'

interface HeroProps {
  items: TitleDetail[]
}

export default function Hero({ items }: HeroProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const { has, toggle } = useMyList()

  useEffect(() => {
    if (paused || items.length < 2) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length)
    }, 9000)
    return () => window.clearInterval(timer)
  }, [paused, items.length])

  if (items.length === 0) return null
  const active = items[Math.min(index, items.length - 1)]
  const saved = has(active.id)

  return (
    <section
      className="hero"
      aria-label="Destaques"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div key={active.id} className="hero__backdrop">
        <Artwork palette={active.palette} title={active.title} variant="wide" showTitle={false} />
      </div>
      <div className="hero__scrim" />

      <div className="hero__content">
        <p className="hero__kicker">
          <span className="hero__kicker-dot" />
          {active.badge ?? 'ORION+ ORIGINAL'}
        </p>
        <h1 className="hero__title">{active.title}</h1>
        <p className="hero__tagline">{active.tagline}</p>

        <div className="meta-row">
          <span className="meta-row__score">
            <IconStar width={14} height={14} /> {active.score.toFixed(1)}
          </span>
          <span className="meta-row__dot" />
          <span>{active.yearLabel}</span>
          <span className="meta-row__dot" />
          <span className="age-chip">{active.ageRating}</span>
          <span className="meta-row__dot" />
          <span>{active.durationLabel}</span>
          <span className="meta-row__dot" />
          <span className="meta-row__genres">{active.genres.slice(0, 2).join(' · ')}</span>
        </div>

        <p className="hero__synopsis">{active.synopsis}</p>

        <div className="hero__actions">
          <Link to={`/assistir/${active.id}`} className="btn btn--primary" data-nav>
            <IconPlay width={18} height={18} />
            Assistir
          </Link>
          <Link to={`/titulo/${active.id}`} className="btn btn--ghost" data-nav>
            <IconInfo width={18} height={18} />
            Mais informações
          </Link>
          <button
            type="button"
            className="btn btn--icon"
            aria-pressed={saved}
            aria-label={saved ? 'Remover da minha lista' : 'Adicionar à minha lista'}
            onClick={() => toggle(active.id)}
            data-nav
          >
            {saved ? <IconCheck width={18} height={18} /> : <IconPlus width={18} height={18} />}
          </button>
        </div>
      </div>

      {items.length > 1 ? (
        <div className="hero__dots" role="tablist" aria-label="Selecionar destaque">
          {items.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              aria-label={`Destaque: ${item.title}`}
              className={`hero__dot ${itemIndex === index ? 'is-active' : ''}`}
              onClick={() => setIndex(itemIndex)}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}

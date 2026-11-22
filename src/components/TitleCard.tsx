import { Link } from 'react-router-dom'
import { useMyList } from '../hooks/useMyList'
import type { Card } from '../types'
import Artwork from './Artwork'
import { IconCheck, IconInfo, IconPlay, IconPlus } from './Icons'

interface TitleCardProps {
  card: Card
  rank?: number
}

export default function TitleCard({ card, rank }: TitleCardProps) {
  const { has, toggle } = useMyList()
  const saved = has(card.id)
  const progress = card.progress ?? 0

  return (
    <article className={`card ${rank ? 'card--ranked' : ''}`}>
      <div className="card__poster">
        <Artwork palette={card.palette} title={card.title} />

        {card.badge ? <span className="card__badge">{card.badge}</span> : null}
        {rank ? (
          <span className="card__rank" aria-hidden="true">
            {rank}
          </span>
        ) : null}

        <Link to={`/titulo/${card.id}`} className="card__hit" aria-label={`${card.title} — ver detalhes`} data-nav>
          <span className="sr-only">{card.title}</span>
        </Link>

        <div className="card__hover">
          <div className="card__hover-actions">
            <Link
              to={`/assistir/${card.id}`}
              className="round-btn round-btn--solid"
              aria-label={`Assistir ${card.title}`}
              tabIndex={-1}
            >
              <IconPlay width={17} height={17} />
            </Link>
            <button
              type="button"
              className="round-btn"
              aria-pressed={saved}
              aria-label={saved ? `Remover ${card.title} da minha lista` : `Adicionar ${card.title} à minha lista`}
              onClick={() => toggle(card.id)}
              tabIndex={-1}
            >
              {saved ? <IconCheck width={17} height={17} /> : <IconPlus width={17} height={17} />}
            </button>
            <Link
              to={`/titulo/${card.id}`}
              className="round-btn"
              aria-label={`Mais informações sobre ${card.title}`}
              tabIndex={-1}
            >
              <IconInfo width={17} height={17} />
            </Link>
          </div>
          <p className="card__hover-meta">
            <strong>{card.score.toFixed(1)}</strong> relevância · <span className="age-chip age-chip--sm">{card.ageRating}</span>
          </p>
          <p className="card__hover-genres">{card.genres.slice(0, 2).join(' · ')}</p>
        </div>

        {progress > 0 ? (
          <div className="card__progress">
            <span style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
        ) : null}
      </div>

      <div className="card__info">
        <h3 className="card__title">{card.title}</h3>
        <p className="card__meta">
          {card.type === 'series' ? 'Série' : 'Filme'} · {card.yearLabel} · {card.durationLabel}
        </p>
      </div>
    </article>
  )
}

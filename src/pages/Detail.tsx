import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Artwork from '../components/Artwork'
import Footer from '../components/Footer'
import Row from '../components/Row'
import { IconCheck, IconChevronLeft, IconPlay, IconPlus, IconStar } from '../components/Icons'
import { useApi } from '../hooks/useApi'
import { useMyList } from '../hooks/useMyList'
import type { DetailResponse } from '../types'

export default function Detail() {
  const { id } = useParams<{ id: string }>()
  const { data, error, loading } = useApi<DetailResponse>(id ? `/api/titles/${id}` : null)
  const { has, toggle } = useMyList()
  const [seasonNumber, setSeasonNumber] = useState(1)

  useEffect(() => {
    const first = data?.title.seasons[0]?.number
    if (first) setSeasonNumber(first)
  }, [data?.title.id, data?.title.seasons])

  if (loading) {
    return (
      <div className="page">
        <div className="skeleton-hero" aria-hidden="true" />
        <p className="sr-only">Carregando detalhes…</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="state-box">
        <h1>Título não encontrado</h1>
        <p>{error ?? 'Este título não está mais no catálogo.'}</p>
        <Link to="/catalogo" className="btn btn--primary" data-nav>
          Voltar ao catálogo
        </Link>
      </div>
    )
  }

  const { title, similar } = data
  const saved = has(title.id)
  const season = title.seasons.find((item) => item.number === seasonNumber) ?? title.seasons[0]

  return (
    <div className="detail">
      <header className="detail__hero">
        <div className="detail__backdrop">
          <Artwork palette={title.palette} title={title.title} variant="wide" showTitle={false} />
        </div>
        <div className="detail__scrim" />

        <div className="detail__content">
          <Link to="/" className="back-link" data-nav>
            <IconChevronLeft width={16} height={16} />
            Início
          </Link>

          <p className="detail__kicker">{title.badge ?? 'ORION+ ORIGINAL'}</p>
          <h1 className="detail__title">{title.title}</h1>
          <p className="detail__tagline">{title.tagline}</p>

          <div className="meta-row">
            <span className="meta-row__score">
              <IconStar width={14} height={14} /> {title.score.toFixed(1)}
            </span>
            <span className="meta-row__dot" />
            <span>{title.yearLabel}</span>
            <span className="meta-row__dot" />
            <span className="age-chip">{title.ageRating}</span>
            <span className="meta-row__dot" />
            <span>{title.durationLabel}</span>
            <span className="meta-row__dot" />
            <span>{title.country}</span>
          </div>

          <div className="hero__actions">
            <Link to={`/assistir/${title.id}`} className="btn btn--primary" data-nav>
              <IconPlay width={18} height={18} />
              Assistir
            </Link>
            <button
              type="button"
              className="btn btn--ghost"
              aria-pressed={saved}
              onClick={() => toggle(title.id)}
              data-nav
            >
              {saved ? <IconCheck width={18} height={18} /> : <IconPlus width={18} height={18} />}
              {saved ? 'Na minha lista' : 'Minha lista'}
            </button>
          </div>

          <p className="detail__synopsis">{title.synopsis}</p>

          <dl className="detail__facts">
            <div>
              <dt>Direção</dt>
              <dd>{title.director}</dd>
            </div>
            <div>
              <dt>Elenco</dt>
              <dd>{title.cast.join(', ')}</dd>
            </div>
            <div>
              <dt>Gêneros</dt>
              <dd>{title.genres.join(' · ')}</dd>
            </div>
            <div>
              <dt>{title.type === 'series' ? 'Temporadas' : 'Duração'}</dt>
              <dd>
                {title.type === 'series'
                  ? `${title.seasons.length} temporada${title.seasons.length > 1 ? 's' : ''} · ${title.episodesCount} episódios`
                  : `${title.durationMin} min`}
              </dd>
            </div>
          </dl>
        </div>
      </header>

      {title.seasons.length > 0 ? (
        <section className="episodes" aria-labelledby="episodes-title">
          <div className="episodes__head">
            <h2 id="episodes-title">Temporadas e episódios</h2>
            <div className="season-tabs">
              {title.seasons.map((item) => (
                <button
                  key={item.number}
                  type="button"
                  className={`chip ${item.number === seasonNumber ? 'is-active' : ''}`}
                  onClick={() => setSeasonNumber(item.number)}
                  aria-pressed={item.number === seasonNumber}
                  data-nav
                >
                  Temporada {item.number}
                </button>
              ))}
            </div>
          </div>

          <ul className="episode-list">
            {(season?.episodes ?? []).map((episode) => (
              <li key={episode.number} className="episode">
                <Link to={`/assistir/${title.id}?ep=${episode.number}`} className="episode__link" data-nav>
                  <span className="episode__thumb">
                    <Artwork palette={title.palette} title={`${title.title} ${episode.title}`} showTitle={false} />
                    <span className="episode__play">
                      <IconPlay width={16} height={16} />
                    </span>
                  </span>
                  <span className="episode__body">
                    <span className="episode__top">
                      <strong>
                        {episode.number}. {episode.title}
                      </strong>
                      <span className="episode__duration">{episode.durationMin} min</span>
                    </span>
                    <span className="episode__synopsis">{episode.synopsis}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <Row row={{ id: `similar-${title.id}`, title: 'Títulos semelhantes', items: similar }} />
      <Footer />
    </div>
  )
}

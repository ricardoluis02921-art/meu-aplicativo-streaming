import { useSearchParams } from 'react-router-dom'
import Footer from '../components/Footer'
import TitleCard from '../components/TitleCard'
import { buildQuery, useApi } from '../hooks/useApi'
import type { ListResponse, TitleType } from '../types'

const SORTS = [
  { value: 'score', label: 'Mais relevantes' },
  { value: 'year', label: 'Mais recentes' },
  { value: 'az', label: 'Ordem A–Z' },
]

interface BrowseProps {
  fixedType?: TitleType
}

export default function Browse({ fixedType }: BrowseProps) {
  const [params, setParams] = useSearchParams()
  const type: TitleType | 'all' = fixedType ?? ((params.get('tipo') as TitleType | null) ?? 'all')
  const genre = params.get('genero') ?? 'all'
  const sort = params.get('ordenar') ?? 'score'

  const genresState = useApi<{ genres: string[] }>('/api/genres')
  const listState = useApi<ListResponse>(`/api/titles${buildQuery({ type, genre, sort })}`)

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (!value || value === 'all') next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const heading = fixedType === 'movie' ? 'Filmes' : fixedType === 'series' ? 'Séries' : 'Catálogo completo'
  const subtitle =
    fixedType === 'movie'
      ? 'Longas-metragens para a sessão da noite'
      : fixedType === 'series'
        ? 'Histórias em episódios para maratonar'
        : 'Tudo o que está disponível no ORION+'

  const items = listState.data?.items ?? []

  return (
    <div className="page page--catalog">
      <header className="catalog-head">
        <p className="catalog-head__kicker">ORION+ Catálogo</p>
        <h1>{heading}</h1>
        <p className="catalog-head__subtitle">{subtitle}</p>

        {!fixedType ? (
          <div className="segmented" role="tablist" aria-label="Tipo de título">
            {[
              { value: 'all', label: 'Tudo' },
              { value: 'movie', label: 'Filmes' },
              { value: 'series', label: 'Séries' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                role="tab"
                aria-selected={type === option.value}
                className={`segmented__item ${type === option.value ? 'is-active' : ''}`}
                onClick={() => update('tipo', option.value)}
                data-nav
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : null}
      </header>

      <div className="filters">
        <div className="filters__genres">
          <button
            type="button"
            className={`chip ${genre === 'all' ? 'is-active' : ''}`}
            onClick={() => update('genero', 'all')}
            data-nav
          >
            Todos os gêneros
          </button>
          {(genresState.data?.genres ?? []).map((item) => (
            <button
              key={item}
              type="button"
              className={`chip ${genre === item ? 'is-active' : ''}`}
              onClick={() => update('genero', item)}
              data-nav
            >
              {item}
            </button>
          ))}
        </div>

        <label className="filters__sort">
          <span>Ordenar por</span>
          <select value={sort} onChange={(event) => update('ordenar', event.target.value)} aria-label="Ordenar por">
            {SORTS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="results-count">
        {listState.loading ? 'Carregando títulos…' : `${items.length} ${items.length === 1 ? 'título' : 'títulos'}`}
      </p>

      {listState.error ? (
        <div className="state-box">
          <h2>Erro ao carregar</h2>
          <p>{listState.error}</p>
        </div>
      ) : (
        <div className="grid">
          {items.map((card) => (
            <TitleCard key={card.id} card={card} />
          ))}
        </div>
      )}

      {!listState.loading && items.length === 0 ? (
        <div className="state-box">
          <h2>Nenhum título com esses filtros</h2>
          <p>Tente outro gênero ou remova a seleção atual.</p>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              setParams(new URLSearchParams(), { replace: true })
            }}
          >
            Limpar filtros
          </button>
        </div>
      ) : null}

      <Footer />
    </div>
  )
}

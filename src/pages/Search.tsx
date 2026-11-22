import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import TitleCard from '../components/TitleCard'
import { IconClose, IconSearch } from '../components/Icons'
import { buildQuery, useApi } from '../hooks/useApi'
import type { ListResponse } from '../types'

const SUGGESTIONS = ['Ficção científica', 'Suspense', 'Documentário', 'Drama', 'Comédia', 'Infantil']

export default function Search() {
  const [params, setParams] = useSearchParams()
  const urlTerm = params.get('q') ?? ''
  const [term, setTerm] = useState(urlTerm)
  const [debounced, setDebounced] = useState(urlTerm)
  const type = params.get('tipo') ?? 'all'

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(term), 220)
    return () => window.clearTimeout(timer)
  }, [term])

  useEffect(() => {
    if (debounced === urlTerm) return
    const next = new URLSearchParams(params)
    if (debounced.trim()) next.set('q', debounced.trim())
    else next.delete('q')
    setParams(next, { replace: true })
  }, [debounced, params, setParams, urlTerm])

  const listState = useApi<ListResponse>(`/api/titles${buildQuery({ q: debounced.trim(), type })}`)
  const items = listState.data?.items ?? []

  const updateType = (value: string) => {
    const next = new URLSearchParams(params)
    if (value === 'all') next.delete('tipo')
    else next.set('tipo', value)
    setParams(next, { replace: true })
  }

  return (
    <div className="page page--search">
      <header className="search-head">
        <h1>Buscar no catálogo</h1>
        <form className="search-field" role="search" onSubmit={(event) => event.preventDefault()}>
          <IconSearch width={20} height={20} />
          <input
            type="search"
            value={term}
            autoFocus
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Título, gênero, diretor ou elenco"
            aria-label="Buscar títulos"
          />
          {term ? (
            <button type="button" className="search-field__clear" aria-label="Limpar busca" onClick={() => setTerm('')}>
              <IconClose width={16} height={16} />
            </button>
          ) : null}
        </form>

        <div className="segmented" role="tablist" aria-label="Filtrar por tipo">
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
              onClick={() => updateType(option.value)}
              data-nav
            >
              {option.label}
            </button>
          ))}
        </div>

        {!term ? (
          <div className="suggestions">
            <p className="suggestions__label">Explore por categoria</p>
            <div className="suggestions__list">
              {SUGGESTIONS.map((suggestion) => (
                <Link
                  key={suggestion}
                  to={`/catalogo?genero=${encodeURIComponent(suggestion)}`}
                  className="chip"
                  data-nav
                >
                  {suggestion}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <p className="results-count">
        {listState.loading
          ? 'Buscando…'
          : `${items.length} ${items.length === 1 ? 'resultado' : 'resultados'}${
              debounced.trim() ? ` para “${debounced.trim()}”` : ''
            }`}
      </p>

      <div className="grid">
        {items.map((card) => (
          <TitleCard key={card.id} card={card} />
        ))}
      </div>

      {!listState.loading && items.length === 0 ? (
        <div className="state-box">
          <h2>Nada encontrado</h2>
          <p>Tente outro termo, como “suspense”, “documentário” ou o nome de um diretor.</p>
          <Link to="/catalogo" className="btn btn--ghost" data-nav>
            Ver catálogo completo
          </Link>
        </div>
      ) : null}
    </div>
  )
}

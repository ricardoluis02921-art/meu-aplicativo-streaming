import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import TitleCard from '../components/TitleCard'
import { IconBookmark } from '../components/Icons'
import { useApi } from '../hooks/useApi'
import { useMyList } from '../hooks/useMyList'
import type { ListResponse } from '../types'

export default function MyList() {
  const { ids, clear } = useMyList()
  const path = ids.length > 0 ? `/api/titles?ids=${ids.map(encodeURIComponent).join(',')}` : null
  const { data, loading } = useApi<ListResponse>(path)
  const items = data?.items ?? []

  return (
    <div className="page page--catalog">
      <header className="catalog-head">
        <p className="catalog-head__kicker">Sua seleção</p>
        <h1>Minha lista</h1>
        <p className="catalog-head__subtitle">
          Os títulos que você salvou ficam guardados neste dispositivo para assistir depois.
        </p>
      </header>

      {ids.length === 0 ? (
        <div className="state-box state-box--empty">
          <span className="state-box__icon">
            <IconBookmark width={26} height={26} />
          </span>
          <h2>Sua lista está vazia</h2>
          <p>Use o botão + nos cards ou na página de detalhes para salvar filmes e séries aqui.</p>
          <Link to="/catalogo" className="btn btn--primary" data-nav>
            Explorar catálogo
          </Link>
        </div>
      ) : (
        <>
          <div className="filters">
            <p className="results-count">{loading ? 'Carregando…' : `${items.length} títulos salvos`}</p>
            <button type="button" className="chip" onClick={clear} data-nav>
              Limpar lista
            </button>
          </div>
          <div className="grid">
            {items.map((card) => (
              <TitleCard key={card.id} card={card} />
            ))}
          </div>
        </>
      )}

      <Footer />
    </div>
  )
}

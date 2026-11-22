import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Row from '../components/Row'
import { useApi } from '../hooks/useApi'
import type { HomeResponse } from '../types'

export default function Home() {
  const { data, error, loading } = useApi<HomeResponse>('/api/home')

  if (error) {
    return (
      <div className="state-box">
        <h1>Não foi possível carregar o catálogo</h1>
        <p>{error}</p>
        <button type="button" className="btn btn--primary" onClick={() => window.location.reload()}>
          Tentar novamente
        </button>
      </div>
    )
  }

  if (loading || !data) {
    return (
      <div className="page">
        <div className="skeleton-hero" aria-hidden="true" />
        <div className="skeleton-rows" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="sr-only">Carregando catálogo…</p>
      </div>
    )
  }

  return (
    <div className="page">
      <Hero items={data.hero} />

      <nav className="genre-strip" aria-label="Categorias">
        <div className="genre-strip__inner">
          {data.genres.map((genre) => (
            <Link key={genre} to={`/catalogo?genero=${encodeURIComponent(genre)}`} className="chip" data-nav>
              {genre}
            </Link>
          ))}
        </div>
      </nav>

      <div className="rows">
        {data.rows.map((row) => (
          <Row key={row.id} row={row} />
        ))}
      </div>

      <section className="feature-band">
        <div className="feature-band__text">
          <p className="feature-band__kicker">Feito para qualquer tela</p>
          <h2>Do celular à Smart TV, a mesma experiência</h2>
          <p>
            O layout se adapta de 360 px a telas 4K, com navegação por toque, teclado e controle remoto. O tema escuro
            reduz o cansaço visual em maratonas longas e mantém o foco na arte dos títulos.
          </p>
          <Link to="/catalogo" className="btn btn--ghost" data-nav>
            Explorar catálogo completo
          </Link>
        </div>
        <ul className="feature-band__list">
          <li>
            <strong>{data.total}</strong>
            <span>títulos no catálogo</span>
          </li>
          <li>
            <strong>{data.genres.length}</strong>
            <span>categorias curadas</span>
          </li>
          <li>
            <strong>4</strong>
            <span>destaques rotativos</span>
          </li>
          <li>
            <strong>100%</strong>
            <span>responsivo</span>
          </li>
        </ul>
      </section>

      <Footer />
    </div>
  )
}

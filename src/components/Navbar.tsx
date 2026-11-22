import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useMyList } from '../hooks/useMyList'
import { IconLogo, IconSearch } from './Icons'

const LINKS = [
  { to: '/', label: 'Início', end: true },
  { to: '/filmes', label: 'Filmes', end: false },
  { to: '/series', label: 'Séries', end: false },
  { to: '/catalogo', label: 'Catálogo', end: false },
  { to: '/minha-lista', label: 'Minha lista', end: false },
]

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [term, setTerm] = useState('')
  const navigate = useNavigate()
  const { count } = useMyList()

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${solid ? 'is-solid' : ''}`}>
      <div className="nav__inner">
        <Link to="/" className="nav__brand" aria-label="ORION+ início" data-nav>
          <IconLogo className="nav__logo" />
          <span className="nav__wordmark">
            ORION<span className="nav__plus">+</span>
          </span>
        </Link>

        <nav className="nav__links" aria-label="Navegação principal">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
              data-nav
            >
              {link.label}
              {link.to === '/minha-lista' && count > 0 ? <span className="nav__count">{count}</span> : null}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <form
            className="nav__search"
            role="search"
            onSubmit={(event) => {
              event.preventDefault()
              navigate(term.trim() ? `/buscar?q=${encodeURIComponent(term.trim())}` : '/buscar')
            }}
          >
            <IconSearch width={18} height={18} />
            <input
              type="search"
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Buscar filmes e séries"
              aria-label="Buscar títulos"
              data-nav
            />
          </form>

          <Link to="/buscar" className="nav__icon-btn nav__icon-btn--mobile" aria-label="Buscar" data-nav>
            <IconSearch />
          </Link>

          <Link to="/minha-lista" className="nav__avatar" aria-label="Meu perfil" data-nav>
            <span>OR</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

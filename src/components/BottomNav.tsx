import { NavLink } from 'react-router-dom'
import { IconBookmark, IconGrid, IconHome, IconSearch } from './Icons'

const ITEMS = [
  { to: '/', label: 'Início', icon: IconHome, end: true },
  { to: '/buscar', label: 'Buscar', icon: IconSearch, end: false },
  { to: '/catalogo', label: 'Catálogo', icon: IconGrid, end: false },
  { to: '/minha-lista', label: 'Minha lista', icon: IconBookmark, end: false },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navegação inferior">
      {ITEMS.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}
            data-nav
          >
            <Icon width={22} height={22} />
            <span>{item.label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}

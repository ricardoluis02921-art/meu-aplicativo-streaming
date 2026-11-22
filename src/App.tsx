import { useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Navbar from './components/Navbar'
import Browse from './pages/Browse'
import Detail from './pages/Detail'
import Home from './pages/Home'
import MyList from './pages/MyList'
import Player from './pages/Player'
import Search from './pages/Search'
import { MyListProvider } from './hooks/useMyList'
import { useKeyNav } from './hooks/useKeyNav'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function NotFound() {
  return (
    <div className="state-box">
      <h1>Página não encontrada</h1>
      <p>O endereço acessado não existe no ORION+.</p>
      <Link to="/" className="btn btn--primary" data-nav>
        Voltar ao início
      </Link>
    </div>
  )
}

function Shell() {
  const location = useLocation()
  const immersive = location.pathname.startsWith('/assistir/')
  useKeyNav()

  return (
    <div className={immersive ? 'app app--immersive' : 'app'}>
      <ScrollToTop />
      {immersive ? null : <Navbar />}
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filmes" element={<Browse fixedType="movie" />} />
          <Route path="/series" element={<Browse fixedType="series" />} />
          <Route path="/catalogo" element={<Browse />} />
          <Route path="/buscar" element={<Search />} />
          <Route path="/minha-lista" element={<MyList />} />
          <Route path="/titulo/:id" element={<Detail />} />
          <Route path="/assistir/:id" element={<Player />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {immersive ? null : <BottomNav />}
    </div>
  )
}

export default function App() {
  return (
    <MyListProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </MyListProvider>
  )
}

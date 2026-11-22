import { useRef } from 'react'
import { Link } from 'react-router-dom'
import type { HomeRow } from '../types'
import TitleCard from './TitleCard'
import { IconChevronLeft, IconChevronRight } from './Icons'

export default function Row({ row }: { row: HomeRow }) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * Math.max(track.clientWidth * 0.85, 260), behavior: 'smooth' })
  }

  return (
    <section className="row" aria-labelledby={`row-title-${row.id}`}>
      <header className="row__head">
        <div className="row__heading">
          <h2 id={`row-title-${row.id}`}>{row.title}</h2>
          {row.subtitle ? <p>{row.subtitle}</p> : null}
        </div>
        {row.link ? (
          <Link to={row.link} className="row__more" data-nav>
            Ver tudo
            <IconChevronRight width={15} height={15} />
          </Link>
        ) : null}
      </header>

      <div className="row__viewport">
        <button
          type="button"
          className="row__arrow row__arrow--prev"
          aria-label="Rolar para a esquerda"
          onClick={() => scroll(-1)}
        >
          <IconChevronLeft />
        </button>

        <div className="row__track" ref={trackRef}>
          {row.items.map((item, index) => (
            <TitleCard key={item.id} card={item} rank={row.ranked ? index + 1 : undefined} />
          ))}
        </div>

        <button
          type="button"
          className="row__arrow row__arrow--next"
          aria-label="Rolar para a direita"
          onClick={() => scroll(1)}
        >
          <IconChevronRight />
        </button>
      </div>
    </section>
  )
}

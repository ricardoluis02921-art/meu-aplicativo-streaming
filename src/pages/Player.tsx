import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import Artwork from '../components/Artwork'
import {
  IconBack10,
  IconChevronLeft,
  IconExpand,
  IconForward10,
  IconPause,
  IconPlay,
  IconVolume,
} from '../components/Icons'
import { useApi } from '../hooks/useApi'
import type { DetailResponse } from '../types'

function formatTime(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(safe / 3600)
  const minutes = Math.floor((safe % 3600) / 60)
  const seconds = safe % 60
  const mm = String(minutes).padStart(hours > 0 ? 2 : 1, '0')
  const ss = String(seconds).padStart(2, '0')
  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`
}

export default function Player() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const episodeNumber = Number(searchParams.get('ep')) || 1
  const { data, error } = useApi<DetailResponse>(id ? `/api/titles/${id}` : null)

  const [playing, setPlaying] = useState(true)
  const [time, setTime] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)

  const title = data?.title
  const season = title?.seasons[0]
  const episode = season?.episodes.find((item) => item.number === episodeNumber)
  const durationSec = (title?.durationMin ?? episode?.durationMin ?? 45) * 60

  useEffect(() => {
    setTime(0)
    setPlaying(true)
  }, [id, episodeNumber])

  useEffect(() => {
    if (!playing || durationSec <= 0) return
    const timer = window.setInterval(() => {
      setTime((current) => (current + 1 >= durationSec ? durationSec : current + 1))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [playing, durationSec])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen?.().catch(() => undefined)
    } else {
      void document.exitFullscreen?.().catch(() => undefined)
    }
  }

  if (error) {
    return (
      <div className="state-box state-box--player">
        <h1>Não foi possível abrir o player</h1>
        <p>{error}</p>
        <Link to="/" className="btn btn--primary" data-nav>
          Voltar ao início
        </Link>
      </div>
    )
  }

  if (!title) {
    return (
      <div className="player player--loading">
        <p>Preparando a transmissão…</p>
      </div>
    )
  }

  const progressPercent = durationSec > 0 ? (time / durationSec) * 100 : 0
  const nextEpisode = season?.episodes.find((item) => item.number === episodeNumber + 1)

  return (
    <div className="player">
      <div className="player__stage">
        <Artwork palette={title.palette} title={title.title} variant="wide" showTitle={false} />
        <div className="player__scrim" />
        <div className="player__stage-label">
          <span className="player__live-dot" />
          Reproduzindo demonstração · ORION+
        </div>
        <div className="player__center">
          <p className="player__eyebrow">{title.type === 'series' ? 'Série ORION+' : 'Filme ORION+'}</p>
          <h1>{title.title}</h1>
          {episode ? <p className="player__episode">T1 E{episode.number} · {episode.title}</p> : null}
          <p className="player__tagline">{title.tagline}</p>
        </div>
      </div>

      <div className="player__controls">
        <input
          className="player__seek"
          type="range"
          min={0}
          max={durationSec}
          step={1}
          value={time}
          aria-label="Progresso do vídeo"
          onChange={(event) => setTime(Number(event.target.value))}
          style={{ ['--seek' as string]: `${progressPercent}%` }}
        />

        <div className="player__bar">
          <div className="player__group">
            <Link to={`/titulo/${title.id}`} className="player__btn" aria-label="Sair do player" data-nav>
              <IconChevronLeft />
            </Link>
            <button
              type="button"
              className="player__btn player__btn--primary"
              aria-label={playing ? 'Pausar' : 'Reproduzir'}
              onClick={() => setPlaying((current) => !current)}
              data-nav
            >
              {playing ? <IconPause width={22} height={22} /> : <IconPlay width={22} height={22} />}
            </button>
            <button
              type="button"
              className="player__btn"
              aria-label="Voltar 10 segundos"
              onClick={() => setTime((current) => Math.max(0, current - 10))}
              data-nav
            >
              <IconBack10 />
            </button>
            <button
              type="button"
              className="player__btn"
              aria-label="Avançar 10 segundos"
              onClick={() => setTime((current) => Math.min(durationSec, current + 10))}
              data-nav
            >
              <IconForward10 />
            </button>
            <button
              type="button"
              className="player__btn player__btn--volume"
              aria-label={muted ? 'Ativar som' : 'Silenciar'}
              onClick={() => setMuted((current) => !current)}
              data-nav
            >
              <IconVolume />
            </button>
            <input
              className="player__volume"
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              aria-label="Volume"
              onChange={(event) => {
                setVolume(Number(event.target.value))
                setMuted(false)
              }}
            />
            <span className="player__time">
              {formatTime(time)} / {formatTime(durationSec)}
            </span>
          </div>

          <div className="player__group">
            <span className="player__title-label">
              {title.title}
              {episode ? ` · T1 E${episode.number}` : ''}
            </span>
            {nextEpisode ? (
              <Link
                to={`/assistir/${title.id}?ep=${nextEpisode.number}`}
                className="btn btn--ghost btn--sm"
                data-nav
              >
                Próximo episódio
              </Link>
            ) : null}
            <button type="button" className="player__btn" aria-label="Tela cheia" onClick={toggleFullscreen} data-nav>
              <IconExpand />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

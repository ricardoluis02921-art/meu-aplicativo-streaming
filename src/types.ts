export type TitleType = 'movie' | 'series'

export interface Card {
  id: string
  title: string
  type: TitleType
  year: number
  yearLabel: string
  ageRating: string
  score: number
  genres: string[]
  palette: [string, string]
  tagline: string
  durationLabel: string
  badge: string | null
  top10: number | null
  progress: number | null
}

export interface Episode {
  number: number
  title: string
  durationMin: number
  synopsis: string
}

export interface Season {
  number: number
  year: number
  episodes: Episode[]
}

export interface TitleDetail extends Card {
  synopsis: string
  cast: string[]
  director: string
  country: string
  durationMin: number | null
  seasons: Season[]
  episodesCount: number
}

export interface HomeRow {
  id: string
  title: string
  subtitle?: string
  ranked?: boolean
  link?: string
  items: Card[]
}

export interface HomeResponse {
  hero: TitleDetail[]
  continueWatching: Card[]
  rows: HomeRow[]
  genres: string[]
  total: number
}

export interface ListResponse {
  total: number
  items: Card[]
}

export interface DetailResponse {
  title: TitleDetail
  similar: Card[]
}

import { useEffect, useState } from 'react'

interface ApiState<T> {
  data: T | null
  error: string | null
  loading: boolean
}

/** Pequeno hook de busca de dados com cancelamento e estado de carregamento. */
export function useApi<T>(path: string | null): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({ data: null, error: null, loading: Boolean(path) })

  useEffect(() => {
    if (!path) {
      setState({ data: null, error: null, loading: false })
      return
    }

    let cancelled = false
    setState((previous) => ({ data: previous.data, error: null, loading: true }))

    fetch(path)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Não foi possível carregar o catálogo (${response.status})`)
        }
        return (await response.json()) as T
      })
      .then((data) => {
        if (!cancelled) setState({ data, error: null, loading: false })
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            data: null,
            error: error instanceof Error ? error.message : 'Erro inesperado ao carregar',
            loading: false,
          })
        }
      })

    return () => {
      cancelled = true
    }
  }, [path])

  return state
}

export function buildQuery(params: Record<string, string | number | undefined | null>): string {
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '' || value === 'all') return
    search.set(key, String(value))
  })
  const query = search.toString()
  return query ? `?${query}` : ''
}

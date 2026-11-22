import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'orion.mylist.v1'

interface MyListValue {
  ids: string[]
  count: number
  has: (id: string) => boolean
  toggle: (id: string) => void
  remove: (id: string) => void
  clear: () => void
}

const MyListContext = createContext<MyListValue | null>(null)

function readStoredIds(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((value): value is string => typeof value === 'string')
  } catch {
    return []
  }
}

export function MyListProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(readStoredIds)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // Armazenamento indisponível (modo privado em algumas TVs): mantém só em memória.
    }
  }, [ids])

  const toggle = useCallback((id: string) => {
    setIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [id, ...current]))
  }, [])

  const remove = useCallback((id: string) => {
    setIds((current) => current.filter((item) => item !== id))
  }, [])

  const clear = useCallback(() => setIds([]), [])

  const value = useMemo<MyListValue>(
    () => ({
      ids,
      count: ids.length,
      has: (id: string) => ids.includes(id),
      toggle,
      remove,
      clear,
    }),
    [ids, toggle, remove, clear],
  )

  return <MyListContext.Provider value={value}>{children}</MyListContext.Provider>
}

export function useMyList(): MyListValue {
  const context = useContext(MyListContext)
  if (!context) throw new Error('useMyList precisa estar dentro de <MyListProvider>')
  return context
}

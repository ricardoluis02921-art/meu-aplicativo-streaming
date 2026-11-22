import { useEffect } from 'react'

const ARROWS = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown']

function isTypingField(element: Element | null): boolean {
  if (!element) return false
  const tag = element.tagName
  if (tag === 'TEXTAREA' || tag === 'SELECT') return true
  if (tag !== 'INPUT') return false
  const type = (element as HTMLInputElement).type
  return ['text', 'search', 'email', 'number', 'url', 'password', 'tel'].includes(type)
}

/**
 * Navegação por controle remoto / teclado (Smart TV, TV Box e desktop).
 * Move o foco entre os elementos marcados com [data-nav] usando as setas.
 */
export function useKeyNav() {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return

      if (event.key === 'Escape') {
        const active = document.activeElement
        if (active instanceof HTMLElement && isTypingField(active)) active.blur()
        return
      }

      if (!ARROWS.includes(event.key)) return
      if (isTypingField(document.activeElement)) return

      const items = Array.from(document.querySelectorAll<HTMLElement>('[data-nav]')).filter(
        (element) => element.offsetParent !== null && !element.hasAttribute('disabled'),
      )
      if (items.length === 0) return

      const active = document.activeElement as HTMLElement | null
      const currentIndex = active ? items.indexOf(active) : -1

      if (currentIndex === -1) {
        event.preventDefault()
        items[0].focus()
        items[0].scrollIntoView({ block: 'nearest', inline: 'nearest' })
        return
      }

      const next = findNext(items, active as HTMLElement, event.key)
      if (!next) return

      event.preventDefault()
      next.focus()
      next.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
}

function findNext(items: HTMLElement[], active: HTMLElement, key: string): HTMLElement | null {
  const origin = active.getBoundingClientRect()
  const originX = origin.left + origin.width / 2
  const originY = origin.top + origin.height / 2
  const horizontal = key === 'ArrowLeft' || key === 'ArrowRight'
  const forward = key === 'ArrowRight' || key === 'ArrowDown'

  let best: { element: HTMLElement; score: number } | null = null

  for (const element of items) {
    if (element === active) continue
    const rect = element.getBoundingClientRect()
    if (rect.width === 0 && rect.height === 0) continue

    const dx = rect.left + rect.width / 2 - originX
    const dy = rect.top + rect.height / 2 - originY
    const primary = horizontal ? dx : dy
    const secondary = horizontal ? dy : dx

    if (forward ? primary <= 8 : primary >= -8) continue
    if (Math.abs(secondary) > Math.abs(primary) * 3 + 40) continue

    const score = Math.abs(primary) + Math.abs(secondary) * 2.4
    if (!best || score < best.score) best = { element, score }
  }

  return best?.element ?? null
}

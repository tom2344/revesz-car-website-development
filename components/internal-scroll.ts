import type { MouseEvent } from 'react'

export const HEADER_OFFSET = 84

export function scrollToId(id: string, event?: React.MouseEvent<HTMLAnchorElement>) {
  event?.preventDefault()
  const target = document.getElementById(id)
  if (!target) return

  window.history.pushState(null, '', `#${id}`)
  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' })
}

export function scrollToHashOnLoad() {
  const id = window.location.hash.slice(1)
  if (!id) return
  window.requestAnimationFrame(() => scrollToId(id))
}

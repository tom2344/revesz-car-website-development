"use client"

import { useEffect } from 'react'

const HEADER_OFFSET = 84

type ScrollMode = 'auto' | 'smooth'

function getInternalHash(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute('href')
  if (!href || !href.startsWith('#') || href === '#') return null
  return href
}

function scrollToHash(hash: string, behavior: ScrollMode) {
  const id = decodeURIComponent(hash.slice(1))
  const target = document.getElementById(id)
  if (!target) return false

  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET)
  window.scrollTo({ top, behavior })
  return true
}

function scrollAfterLayout(hash: string, behavior: ScrollMode) {
  let frame = 0
  let attempts = 0

  const tryScroll = () => {
    attempts += 1
    if (scrollToHash(hash, behavior) || attempts >= 4) return
    frame = window.requestAnimationFrame(tryScroll)
  }

  frame = window.requestAnimationFrame(tryScroll)
  return () => window.cancelAnimationFrame(frame)
}

export function HashNavigation() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const behavior = (): ScrollMode => reducedMotion.matches ? 'auto' : 'smooth'

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a')
      const hash = anchor ? getInternalHash(anchor) : null
      if (!hash) return

      event.preventDefault()
      window.history.pushState(null, '', hash)
      scrollAfterLayout(hash, behavior())
    }

    const handleHashChange = () => {
      scrollAfterLayout(window.location.hash, behavior())
    }

    document.addEventListener('click', handleClick, true)
    window.addEventListener('hashchange', handleHashChange)
    const cancelInitialScroll = window.location.hash ? scrollAfterLayout(window.location.hash, 'auto') : undefined

    return () => {
      cancelInitialScroll?.()
      document.removeEventListener('click', handleClick, true)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return null
}

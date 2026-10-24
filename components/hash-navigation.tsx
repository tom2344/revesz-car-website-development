"use client"

import { useEffect } from 'react'

const HEADER_OFFSET = 84

function isSamePageHashLink(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute('href')
  return Boolean(href?.startsWith('#') && href.length > 1)
}

function scrollToHash(hash: string, behavior: ScrollBehavior) {
  const target = document.getElementById(decodeURIComponent(hash.slice(1)))
  if (!target) return false

  const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET)
  window.scrollTo({ top, behavior })
  return true
}

export function HashNavigation() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const getBehavior = () => prefersReducedMotion.matches ? 'auto' : 'smooth'

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a')
      if (!anchor || !isSamePageHashLink(anchor)) return
      const hash = anchor.getAttribute('href')!
      if (!scrollToHash(hash, getBehavior())) return
      event.preventDefault()
      window.history.pushState(null, '', hash)
    }

    const handleHashChange = () => {
      window.requestAnimationFrame(() => scrollToHash(window.location.hash, getBehavior()))
    }

    document.addEventListener('click', handleClick)
    window.addEventListener('hashchange', handleHashChange)
    if (window.location.hash) window.requestAnimationFrame(() => scrollToHash(window.location.hash, 'auto'))

    return () => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return null
}

"use client"

import { useEffect } from 'react'
import { scrollToHashOnLoad } from './internal-scroll'

export function HashLoad() {
  useEffect(() => {
    scrollToHashOnLoad()
  }, [])

  return null
}

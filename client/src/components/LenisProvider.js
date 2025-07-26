'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
    })

    // Expose lenis instance globally
    // window.lenis = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      // delete window.lenis
    }
  }, [])

  return null
}
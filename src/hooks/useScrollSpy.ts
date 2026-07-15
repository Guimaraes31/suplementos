import { useEffect, useState } from 'react'
import { getScrollSpyOffset } from '../config/navigation'

export function useScrollSpy(sectionIds: readonly string[], offset?: number) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    if (sectionIds.length === 0) {
      setActiveId('')
      return
    }

    let raf = 0

    const measure = () => {
      const spyOffset = offset ?? getScrollSpyOffset()
      const scrollPos = window.scrollY + spyOffset
      const viewBottom = window.scrollY + window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      if (viewBottom >= docHeight - 48) {
        const lastId = sectionIds[sectionIds.length - 1]
        if (document.getElementById(lastId)) {
          setActiveId(lastId)
          return
        }
      }

      let current = sectionIds[0]
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= scrollPos + 1) {
          current = id
        }
      }

      setActiveId(current)
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionIds, offset])

  return activeId
}
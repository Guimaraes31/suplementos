import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'

interface DeferredMountProps {
  children: ReactNode
  minHeight?: string | number
  rootMargin?: string
  fallback?: ReactNode
}

export default function DeferredMount({
  children,
  minHeight = 1,
  rootMargin = '320px 0px',
  fallback = null,
}: DeferredMountProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold: 0 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [visible, rootMargin])

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? <Suspense fallback={fallback}>{children}</Suspense> : null}
    </div>
  )
}
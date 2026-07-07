import { useState } from 'react'
import { images } from '../../assets/images'
import './SafeImage.css'

interface SafeImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  loading?: 'eager' | 'lazy'
}

export default function SafeImage({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [loaded, setLoaded] = useState(false)

  return (
    <img
      className={`safe-image ${loaded ? 'safe-image--loaded' : ''} ${className}`.trim()}
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => {
        if (currentSrc !== images.fallback) {
          setCurrentSrc(images.fallback)
          setLoaded(false)
        }
      }}
    />
  )
}
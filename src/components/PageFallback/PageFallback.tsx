import './PageFallback.css'

export default function PageFallback() {
  return (
    <div className="page-fallback" role="status" aria-live="polite" aria-label="Carregando página">
      <span className="page-fallback__spinner" aria-hidden="true" />
    </div>
  )
}
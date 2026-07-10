import './SectionDivider.css'

interface SectionDividerProps {
  label?: string
}

export default function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="section-divider" aria-hidden={!label}>
      <span className="section-divider__line" />
      {label && <span className="section-divider__label">{label}</span>}
      <span className="section-divider__line" />
    </div>
  )
}
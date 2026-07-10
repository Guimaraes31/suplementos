import { formatPrice } from '../../utils/format'
import './PriceRangeFilter.css'

interface PriceRangeFilterProps {
  min: number
  max: number
  minValue: number
  maxValue: number
  onMinChange: (value: number) => void
  onMaxChange: (value: number) => void
}

export default function PriceRangeFilter({
  min,
  max,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}: PriceRangeFilterProps) {
  const range = max - min || 1
  const minPercent = ((minValue - min) / range) * 100
  const maxPercent = ((maxValue - min) / range) * 100

  return (
    <div className="price-range">
      <div className="price-range__values">
        <span className="price-range__value">
          <span className="price-range__value-label">Mín</span>
          <strong>{formatPrice(minValue)}</strong>
        </span>
        <span className="price-range__divider" aria-hidden="true" />
        <span className="price-range__value">
          <span className="price-range__value-label">Máx</span>
          <strong>{formatPrice(maxValue)}</strong>
        </span>
      </div>

      <div className="price-range__track-wrap">
        <div className="price-range__track" aria-hidden="true">
          <div
            className="price-range__fill"
            style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
          />
        </div>
        <input
          type="range"
          className="price-range__input price-range__input--min"
          min={min}
          max={max}
          step={5}
          value={minValue}
          onChange={(e) => {
            const next = Math.min(Number(e.target.value), maxValue - 5)
            onMinChange(next)
          }}
          aria-label="Preço mínimo"
        />
        <input
          type="range"
          className="price-range__input price-range__input--max"
          min={min}
          max={max}
          step={5}
          value={maxValue}
          onChange={(e) => {
            const next = Math.max(Number(e.target.value), minValue + 5)
            onMaxChange(next)
          }}
          aria-label="Preço máximo"
        />
      </div>
    </div>
  )
}
import { images } from '../../assets/images'
import './BrandLogo.css'

interface BrandLogoProps {
  variant?: 'navbar' | 'footer'
  showText?: boolean
}

export default function BrandLogo({ variant = 'navbar', showText = true }: BrandLogoProps) {
  return (
    <span className={`brand-logo brand-logo--${variant}`}>
      <img
        className="brand-logo__mark"
        src={images.brand.logo}
        alt=""
        width={variant === 'navbar' ? 44 : 52}
        height={variant === 'navbar' ? 44 : 52}
        aria-hidden="true"
      />
      {showText && (
        <span className="brand-logo__text">
          <span className="brand-logo__main">Nascimento</span>
          <span className="brand-logo__sub">Suplementos</span>
        </span>
      )}
    </span>
  )
}
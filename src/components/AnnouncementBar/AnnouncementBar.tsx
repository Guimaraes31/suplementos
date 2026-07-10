import './AnnouncementBar.css'

const items = [
  { text: 'Frete grátis', highlight: true, rest: 'acima de R$ 199 na Zona Sul' },
  { text: 'Cupom NASCIMENTO10', highlight: true, rest: '· 10% na 1ª compra' },
  { text: 'Creatina', highlight: true, rest: 'em destaque · peça orientação no WhatsApp' },
  { text: 'Whey + creatina', highlight: false, rest: '· combo inteligente' },
  { text: 'Retire na loja', highlight: false, rest: '· Jardim São Carlos' },
] as const

function Row() {
  return (
    <>
      {items.map((item, i) => (
        <span key={`${item.text}-${i}`} className="announce__item">
          {item.highlight ? <strong>{item.text}</strong> : item.text}
          {item.rest ? ` ${item.rest}` : null}
          <span className="announce__dot" aria-hidden="true" />
        </span>
      ))}
    </>
  )
}

export default function AnnouncementBar() {
  return (
    <div className="announce" role="region" aria-label="Promoções da loja">
      <div className="announce__mask">
        <div className="announce__track">
          <div className="announce__group">
            <Row />
          </div>
          <div className="announce__group" aria-hidden="true">
            <Row />
          </div>
        </div>
      </div>
    </div>
  )
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function formatPrice(value: number): string {
  return currencyFormatter.format(value)
}

/** Texto auxiliar de conversão — sem afirmar parcelamento que a loja não divulgou publicamente. */
export function formatInstallment(_value: number, _installments = 6): string {
  return 'Dúvida? Peça orientação no WhatsApp'
}
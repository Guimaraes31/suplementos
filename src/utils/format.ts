const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function formatPrice(value: number): string {
  return currencyFormatter.format(value)
}

export function formatInstallment(value: number, installments = 6): string {
  const perInstallment = value / installments
  return `${installments}x de ${currencyFormatter.format(perInstallment)} sem juros`
}
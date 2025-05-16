export function formatPrice(price: number): string {
  return (
    new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0, // 小数点以下を表示しない
    }).format(price) + " (税込)"
  )
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

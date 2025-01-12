export const formatRupiah = (price: number): string => {
  return price.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0, // Optional: remove decimal numbers if 0
    maximumFractionDigits: 0, // Optional: remove decimal numbers if 0
  })
}

export const formatRupiahWithDecimal = (price: number): string => {
  return price.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
}

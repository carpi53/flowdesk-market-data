export function fixedDecimal(value: number, decimal: number){
  return value.toFixed(decimal)
}

export function numberWithCommas(value: Number) {
  return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
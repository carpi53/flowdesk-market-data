export interface Symbols {
  symbol: string
}

export interface Exchange {
  symbols: Symbols[];
}

export interface SelectOptions {
  value: string,
  text: string
}

export interface Trade {
  id: number,
  price: number,
  qty: number,
  time: number
}

export interface Ticker {
  symbol: string,
  priceChange: number,
  priceChangePercent: number,
  weightedAvgPrice: number,
  prevClosePrice: number,
  lastPrice: number,
  lastQty: number,
  bidPrice: number,
  bidQty: number,
  askPrice: number,
  askQty: number,
  openPrice: number,
  highPrice: number,
  lowPrice: number,
  volume: number,
  quoteVolume: number,
  openTime: number,
  closeTime: number,
  firstId: number,
  lastId: number,
  count: number
}

export type Sorting = "Quantity" | "Price" | "Date"


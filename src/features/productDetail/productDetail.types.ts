export interface SizeInfo {
  size: string
  quantity: number
}

export interface Product {
  id: number
  name: string
  price: number
  imageUrl: string
  clothesSizeList: SizeInfo[]
}

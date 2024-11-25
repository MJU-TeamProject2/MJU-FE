export interface SizeInfo {
  size: string
  quantity: number
}

export interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
  clothesSizeList: SizeInfo[]
}

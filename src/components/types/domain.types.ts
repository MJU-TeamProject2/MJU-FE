export type ClothesCategory = 'SHOES' | 'TOP' | 'BOTTOM' | 'OUTER' | 'ACCESSORY'
export type GenderCategory = 'MALE' | 'FEMALE' | 'UNISEX'
export type ClothesSize = 'XS' | 'S' | 'M' | 'L' | 'XL'

export interface SizeInfo {
  size: ClothesSize
  quantity: number
}

export interface Product {
  category: ClothesCategory
  id: number
  clothesSizeList: SizeInfo[]
  detailUrl: string
  discount: number
  genderCategory: GenderCategory
  imageUrl: string
  mtlUrl: string
  name: string
  objectFemaleUrl: string
  objectUrl: string
  price: number
  productNumber: string
}

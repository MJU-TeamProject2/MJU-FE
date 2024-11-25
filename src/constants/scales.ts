export type SizeType = 'XS' | 'S' | 'M' | 'L' | 'XL'
export type HeightType = '150~' | '160~' | '170~' | '180~' | '190~'
export type GenderType = '남자' | '여자'

export const sizeScales: Record<SizeType, number> = {
  XS: 0.095,
  S: 0.098,
  M: 0.1,
  L: 0.102,
  XL: 0.105,
}

export const heightScales: Record<HeightType, number> = {
  '150~': 0.095,
  '160~': 0.098,
  '170~': 0.1,
  '180~': 0.102,
  '190~': 0.105,
}

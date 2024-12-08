import { Select, SoldOut } from '@/domain/productDetail/productDetail.styled'
import type { SizeInfo } from '@/components/types/domain.types'

interface SizeSelectorProps {
  selectedSize: string
  setSelectedSize: (size: string) => void
  availableSizes: SizeInfo[]
  isSoldOut: boolean
}

export const SizeSelector = ({
  selectedSize,
  setSelectedSize,
  availableSizes,
  isSoldOut,
}: SizeSelectorProps) => {
  const getStockDisplay = (quantity: number) => {
    if (quantity <= 10) {
      return ` (재고: ${quantity})`
    }
    return ''
  }

  if (isSoldOut) {
    return <SoldOut>Sold Out</SoldOut>
  }

  return (
    <Select
      value={selectedSize}
      onChange={(e) => setSelectedSize(e.target.value)}
    >
      {availableSizes.map((sizeInfo) => (
        <option key={sizeInfo.size} value={sizeInfo.size}>
          {sizeInfo.size}
          {getStockDisplay(sizeInfo.quantity)}
        </option>
      ))}
    </Select>
  )
}

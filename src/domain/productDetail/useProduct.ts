import { useState, useEffect } from 'react'
import { retrieveClothesDetail } from '@/services/clothesApi'
import { Product, SizeInfo } from '@/domain/productDetail/productDetail.types'

export const useProduct = (id: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState('')

  const loadProductDetails = async () => {
    if (!id) return
    const details = await retrieveClothesDetail(id)
    setProduct(details)

    const filteredSizes =
      details?.clothesSizeList?.filter(
        (sizeInfo: SizeInfo) => sizeInfo.quantity > 0
      ) || []

    if (filteredSizes.length > 0) {
      setSelectedSize(filteredSizes[0].size)
    }
  }

  useEffect(() => {
    loadProductDetails()
  }, [id])

  const availableSizes =
    product?.clothesSizeList?.filter(
      (sizeInfo: SizeInfo) => sizeInfo.quantity > 0
    ) || []

  const isSoldOut = availableSizes.length === 0

  return { product, selectedSize, setSelectedSize, availableSizes, isSoldOut }
}

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { retriveClothesDetail } from '@/api/clothesApi'
import * as S from '@/component/styles/products/detailStyles'

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<any>(null)
  const [selectedSize, setSelectedSize] = useState('')

  const loadProductDetails = async () => {
    if (id) {
      const details = await retriveClothesDetail(id)
      setProduct(details)
    }
  }

  useEffect(() => {
    loadProductDetails()
  }, [id])

  if (!product) return <div>Loading...</div>

  return (
    <S.ProductDetailContainer>
      <S.ProductInfoSection>
        <S.ProductContentWrapper>
          <S.ImageContainer>
            <S.ProductImage src={product.imageUrl} alt={product.name} />
          </S.ImageContainer>
          <S.ProductInfo>
            <S.ProductName>{product.name}</S.ProductName>
            <S.Price>{product.price.toLocaleString()} 원</S.Price>
            <S.Select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">사이즈 선택</option>
              {product.sizes?.map((size: string) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </S.Select>
            <S.ButtonGroup>
              <S.BuyButton>구매하기</S.BuyButton>
              <S.CartButton>장바구니</S.CartButton>
            </S.ButtonGroup>
          </S.ProductInfo>
        </S.ProductContentWrapper>
      </S.ProductInfoSection>
      <S.FittingRoomSection>
        <S.FittingRoomButton>피팅 하기</S.FittingRoomButton>
      </S.FittingRoomSection>
    </S.ProductDetailContainer>
  )
}

export default ProductDetail

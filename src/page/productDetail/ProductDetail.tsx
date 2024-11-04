import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { retrieveClothesDetail } from '@/api/clothesApi'
import {
  ProductDetailContainer,
  ProductInfoSection,
  ProductContentWrapper,
  ImageContainer,
  ProductInfo,
  ProductName,
  Price,
  Select,
  ButtonGroup,
  BuyButton,
  CartButton,
  SoldOut,
  Divider,
  ProductImage,
} from '@/component/styles/products/detailStyles'
import { postCartItems } from '@/api/cartApi'

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<any>(null)
  const [selectedSize, setSelectedSize] = useState('')
  const navigate = useNavigate()

  const availableSizes =
    product?.clothesSizeList?.filter(
      (sizeInfo: SizeInfo) => sizeInfo.quantity > 0
    ) || []

  const isSoldOut = availableSizes.length === 0

  const getStockDisplay = (quantity: number) => {
    if (quantity <= 10) {
      return ` (재고: ${quantity})`
    }
    return ''
  }

  const loadProductDetails = async () => {
    if (id) {
      const details = await retrieveClothesDetail(id)
      setProduct(details)
      // 상품 정보를 받아온 후 첫 번째 사용 가능한 사이즈를 기본값으로 설정
      const filteredSizes =
        details?.clothesSizeList?.filter(
          (sizeInfo: SizeInfo) => sizeInfo.quantity > 0
        ) || []
      if (filteredSizes.length > 0) {
        setSelectedSize(filteredSizes[0].size)
      }
    }
  }

  const handleFittingClick = () => {
    navigate('/fitting')
  }
  const handleBuyButton = async () => {
    const token = localStorage.getItem('accessToken')
    try {
      if (!token) {
        throw new Error('로그인이 필요합니다.')
      } else if (id) {
        await postCartItems(id, selectedSize)
        navigate('/cart')
      }
    } catch (error) {
      console.error(error)
      alert('로그인이 필요합니다.')
      navigate('/login')
    }
  }
  const handlePostCartItems = async () => {
    const token = localStorage.getItem('accessToken')
    try {
      if (!token) {
        throw new Error('로그인이 필요합니다.')
      } else if (id) {
        await postCartItems(id, selectedSize)
        alert('장바구니 추가 완료')
      }
    } catch (error) {
      console.error(error)
      alert('로그인이 필요합니다.')
      navigate('/login')
    }
  }

  useEffect(() => {
    loadProductDetails()
  }, [id])

  if (!product) return <div>Loading...</div>

  return (
    <ProductDetailContainer>
      <ProductInfoSection>
        <ProductContentWrapper>
          <ImageContainer>
            <ProductImage src={product.imageUrl} alt={product.name} />
          </ImageContainer>
          <Divider />
          <ProductInfo>
            <ProductName>{product.name}</ProductName>
            <Price>{product.price.toLocaleString()} 원</Price>
            {isSoldOut ? (
              <SoldOut>Sold Out</SoldOut>
            ) : (
              <Select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {availableSizes.map((sizeInfo: SizeInfo) => (
                  <option key={sizeInfo.size} value={sizeInfo.size}>
                    {sizeInfo.size}
                    {getStockDisplay(sizeInfo.quantity)}
                  </option>
                ))}
              </Select>
            )}
            <ButtonGroup>
              <BuyButton onClick={handleBuyButton} disabled={isSoldOut}>
                구매하기
              </BuyButton>
              <CartButton onClick={handlePostCartItems} disabled={isSoldOut}>
                장바구니
              </CartButton>
            </ButtonGroup>
            <BuyButton onClick={handleFittingClick}>피팅하기</BuyButton>
          </ProductInfo>
        </ProductContentWrapper>
      </ProductInfoSection>
    </ProductDetailContainer>
  )
}

interface SizeInfo {
  size: string
  quantity: number
}
export default ProductDetail

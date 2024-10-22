import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { retrieveClothesDetail } from '@/api/clothesApi'
import {
  ProductDetailContainer,
  ProductInfoSection,
  ProductContentWrapper,
  ImageContainer,
  ProductImage,
  ProductInfo,
  ProductName,
  Price,
  Select,
  ButtonGroup,
  BuyButton,
  CartButton,
} from '@/component/styles/products/detailStyles'
import { postCartItems } from '@/api/cartApi'

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<any>(null)
  const [selectedSize, setSelectedSize] = useState('')
  const navigate = useNavigate()

  const loadProductDetails = async () => {
    if (id) {
      const details = await retrieveClothesDetail(id)
      setProduct(details)
    }
  }
  const handleFittingClick = () => {
    navigate('/fitting')
  }
  const handlePostCartItems = async () => {
    if (id) await postCartItems(id, selectedSize)
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
          <ProductInfo>
            <ProductName>{product.name}</ProductName>
            <Price>{product.price.toLocaleString()} 원</Price>
            <Select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">사이즈 선택</option>
              {product.clothesSizeList?.map((sizeInfo) => (
                <option key={sizeInfo.size} value={sizeInfo.size}>
                  {sizeInfo.size} (재고: {sizeInfo.quantity})
                </option>
              ))}
            </Select>
            <ButtonGroup>
              <BuyButton>구매하기</BuyButton>
              <CartButton onClick={handlePostCartItems}>장바구니</CartButton>
            </ButtonGroup>
            <BuyButton onClick={handleFittingClick}>피팅하기</BuyButton>
          </ProductInfo>
        </ProductContentWrapper>
      </ProductInfoSection>
    </ProductDetailContainer>
  )
}

export default ProductDetail

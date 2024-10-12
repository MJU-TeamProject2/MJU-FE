import React, { useState } from 'react'
import {
  CartContainer,
  CartHeader,
  Checkbox,
  ProductContainer,
  ProductImage,
  ProductInfo,
  PriceInfo,
  PurchaseButton,
  TotalSection,
  DeleteButton,
} from '@/component/styles/user/cartStyles'

interface Product {
  id: string
  name: string
  size: string
  price: number
  originalPrice: number
  imageUrl: string
}

const Cart: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'product1',
      name: '데미지 워시드 데님 팬츠 - 미디엄 블루',
      size: 'XS',
      price: 29700,
      originalPrice: 53000,
      imageUrl: 'https://via.placeholder.com/100',
    },
    {
      id: 'product2',
      name: '블랙 진 - 슬림 핏',
      size: 'M',
      price: 35000,
      originalPrice: 49000,
      imageUrl: 'https://via.placeholder.com/100',
    },
  ])

  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const handleProductSelection = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    } else {
      setSelectedProducts([...selectedProducts, productId])
    }
  }

  // 개별 제품 삭제 로직 (엑스 버튼 눌렀을 때)
  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((product) => product.id !== productId))
    setSelectedProducts(selectedProducts.filter((id) => id !== productId))
  }
  const handleDeleteSelected = () => {
    setProducts(
      products.filter((product) => !selectedProducts.includes(product.id))
    )
    setSelectedProducts([])
  }
  const handlePurchase = () => {
    alert('구매가 완료되었습니다!')
  }

  return (
    <CartContainer>
      <CartHeader>
        <div>
          <Checkbox
            type="checkbox"
            checked={selectedProducts.length === products.length} // 전체 선택 여부 확인
            onChange={() =>
              setSelectedProducts(
                selectedProducts.length === products.length
                  ? []
                  : products.map((p) => p.id)
              )
            }
          />
          전체 선택
        </div>
        <DeleteButton onClick={handleDeleteSelected}>선택 삭제</DeleteButton>
      </CartHeader>

      {products.map((product) => (
        <ProductContainer key={product.id}>
          <Checkbox
            type="checkbox"
            checked={selectedProducts.includes(product.id)}
            onChange={() => handleProductSelection(product.id)}
          />
          <ProductImage src={product.imageUrl} alt="Product Image" />
          <ProductInfo>
            <p>{product.name}</p>
            <p>{product.size} / 1개</p>
            <p style={{ textDecoration: 'line-through', color: '#767676' }}>
              {product.originalPrice.toLocaleString()}원
            </p>
            <p style={{ fontWeight: 'bold', color: '#000' }}>
              {product.price.toLocaleString()}원
            </p>
          </ProductInfo>
          <PriceInfo>
            {/* 제품 삭제 버튼 */}
            <button onClick={() => handleDeleteProduct(product.id)}>X</button>
          </PriceInfo>
        </ProductContainer>
      ))}
      <PurchaseButton onClick={handlePurchase}>구매하기</PurchaseButton>

      <TotalSection>
        <div>
          <p>구매 금액</p>
          <p>할인 금액</p>
          <p>상품 금액</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p>0원</p>
          <p style={{ color: 'blue' }}>-0원</p>
          <p style={{ fontWeight: 'bold', fontSize: '24px' }}>0원</p>
        </div>
      </TotalSection>
    </CartContainer>
  )
}

export default Cart

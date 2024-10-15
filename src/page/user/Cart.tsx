import React, { useState, useEffect } from 'react'
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
import {
  getCartItems,
  deleteCartItem,
  updateCartItemQuantity,
  purchaseCartItems,
} from '@/api/cartApi'
import { useNavigate } from 'react-router-dom'

interface Product {
  id: string
  name: string
  size: string
  price: number
  originalPrice: number
  imageUrl: string
  quantity: number
}

const Cart: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const navigate = useNavigate() // useNavigate 사용

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartItems = await getCartItems()
      const formattedProducts = cartItems.map((item) => ({
        id: item.clothesId.toString(),
        name: item.name,
        size: 'M',
        price: item.price,
        originalPrice: item.price + item.discount,
        imageUrl: item.imageUrl,
        quantity: 1,
      }))
      setProducts(formattedProducts)
    }
    fetchCartItems()
  }, [])

  const handleProductSelection = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    } else {
      setSelectedProducts([...selectedProducts, productId])
    }
  }

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length && products.length > 0) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(products.map((product) => product.id))
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    await deleteCartItem(Number(productId))
    setProducts(products.filter((product) => product.id !== productId))
    setSelectedProducts(selectedProducts.filter((id) => id !== productId))
  }

  const handleDeleteSelected = async () => {
    await Promise.all(selectedProducts.map((id) => deleteCartItem(Number(id))))
    setProducts(
      products.filter((product) => !selectedProducts.includes(product.id))
    )
    setSelectedProducts([])
  }

  const handleQuantityUpdate = async (
    productId: string,
    newQuantity: number
  ) => {
    await updateCartItemQuantity(Number(productId), newQuantity)
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, quantity: newQuantity } : product
    )
    setProducts(updatedProducts)
  }

  const handlePurchase = async () => {
    if (selectedProducts.length === 0) {
      alert('선택된 상품이 없습니다.')
      return
    }
    await purchaseCartItems(selectedProducts)
    alert('구매가 완료되었습니다!')
    navigate('/')
  }

  const calculateTotalPrice = () => {
    return products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    )
  }

  const calculateTotalDiscount = () => {
    return products.reduce(
      (acc, product) =>
        acc + (product.originalPrice - product.price) * product.quantity,
      0
    )
  }

  const totalPrice = calculateTotalPrice()
  const totalDiscount = calculateTotalDiscount()
  const finalPrice = totalPrice - totalDiscount

  return (
    <CartContainer>
      <CartHeader>
        <div>
          <Checkbox
            type="checkbox"
            checked={
              selectedProducts.length === products.length && products.length > 0
            }
            onChange={handleSelectAll}
          />
          전체 선택
        </div>
        <DeleteButton onClick={handleDeleteSelected}>전체 삭제</DeleteButton>
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
            <p>
              {product.size} / {product.quantity}개
            </p>
            <p style={{ textDecoration: 'line-through', color: '#767676' }}>
              {product.originalPrice.toLocaleString()}원
            </p>
            <p style={{ fontWeight: 'bold', color: '#000' }}>
              {product.price.toLocaleString()}원
            </p>
            <button
              onClick={() =>
                handleQuantityUpdate(product.id, product.quantity + 1)
              }
            >
              수량 증가
            </button>
            <button
              onClick={() =>
                handleQuantityUpdate(product.id, product.quantity - 1)
              }
            >
              수량 감소
            </button>
          </ProductInfo>
          <PriceInfo>
            <button onClick={() => handleDeleteProduct(product.id)}>X</button>
          </PriceInfo>
        </ProductContainer>
      ))}

      <PurchaseButton onClick={handlePurchase}>구매하기</PurchaseButton>

      <TotalSection>
        <div>
          <p style={{ color: '#000', fontWeight: 'bold', fontSize: '18px' }}>
            구매 금액
          </p>
          <p style={{ color: '#767676', fontSize: '14px' }}>할인 금액</p>
          <p style={{ color: '#767676', fontSize: '14px' }}>상품 금액</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ color: '#000', fontWeight: 'bold', fontSize: '18px' }}>
            {totalPrice.toLocaleString()}원
          </p>
          <p style={{ color: 'blue', fontSize: '14px' }}>
            -{totalDiscount.toLocaleString()}원
          </p>
          <p style={{ color: '#767676', fontSize: '14px' }}>
            {finalPrice.toLocaleString()}원
          </p>
        </div>
      </TotalSection>
    </CartContainer>
  )
}

export default Cart

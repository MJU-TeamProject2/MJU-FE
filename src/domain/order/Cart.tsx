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
  QuantityButton,
  TotalLabel,
  PriceLabel,
  DiscountPrice,
  OriginalPrice,
  CurrentPrice,
  QuantityContainer,
  DeleteButton,
  QuantityDisplay,
  DeleteProductButton,
} from '@/domain/user/styles/cart.styled'
import {
  getCartItems,
  deleteCartItem,
  updateCartItemQuantity,
} from '@/services/cartApi'
import { Plus, Minus, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Product {
  id: string
  cartId: string
  name: string
  size: string
  price: number
  originalPrice: number
  imageUrl: string
  quantity: number
  availableQuantity: number
}

const Cart: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await getCartItems()
        const formattedProducts = cartItems.map((item) => ({
          cartId: item.cartId.toString(),
          id: item.clothesId.toString(),
          name: item.name,
          size: item.size,
          price:
            item.price *
            (item.discount === 0 ? 1 : (100 - item.discount) / 100),
          originalPrice: item.price,
          imageUrl: item.imageUrl,
          quantity: item.quantity,
          availableQuantity: item.availableQuantity,
        }))
        setProducts(formattedProducts)
      } catch (error) {
        console.error('장바구니 상품 불러오기 중 오류 발생:', error)
      }
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
      setSelectedProducts(products.map((product) => product.cartId))
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    await deleteCartItem(Number(productId))
    setProducts(products.filter((product) => product.cartId !== productId))
    setSelectedProducts(
      selectedProducts.filter((cartId) => cartId !== productId)
    )
  }

  const handleDeleteSelected = async () => {
    await Promise.all(selectedProducts.map((id) => deleteCartItem(Number(id))))
    setProducts(
      products.filter((product) => !selectedProducts.includes(product.cartId))
    )
    setSelectedProducts([])
  }

  const handleQuantityUpdate = async (
    productId: string,
    newQuantity: number
  ) => {
    await updateCartItemQuantity(Number(productId), newQuantity)
    const updatedProducts = products.map((product) =>
      product.cartId === productId
        ? { ...product, quantity: newQuantity }
        : product
    )
    setProducts(updatedProducts)
  }

  const handlePurchase = () => {
    if (selectedProducts.length === 0) {
      alert('선택된 상품이 없습니다.')
      return
    }
    navigate('/order', {
      state: {
        products: products.filter((product) =>
          selectedProducts.includes(product.cartId)
        ),
        finalPrice: calculateTotalPrice(),
      },
    })
  }

  const calculateTotalPrice = () => {
    const selectedProductsList = products.filter((product) =>
      selectedProducts.includes(product.cartId)
    )
    return selectedProductsList.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    )
  }

  const calculateTotalDiscount = () => {
    const selectedProductsList = products.filter((product) =>
      selectedProducts.includes(product.cartId)
    )
    return selectedProductsList.reduce(
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
        <DeleteButton onClick={handleDeleteSelected}>선택 삭제</DeleteButton>
      </CartHeader>

      {products.map((product) => (
        <ProductContainer key={product.cartId}>
          <Checkbox
            type="checkbox"
            checked={selectedProducts.includes(product.cartId)}
            onChange={() => handleProductSelection(product.cartId)}
          />
          <ProductImage src={product.imageUrl} alt={product.name} />
          <ProductInfo>
            <p>{product.name}</p>
            <p>{product.quantity}개</p>
            {product.originalPrice !== product.price && (
              <OriginalPrice>
                {(product.originalPrice * product.quantity).toLocaleString()}원
              </OriginalPrice>
            )}
            <CurrentPrice>
              {(product.price * product.quantity).toLocaleString()}원
            </CurrentPrice>
            <QuantityContainer>
              <QuantityButton
                onClick={() =>
                  handleQuantityUpdate(
                    product.cartId,
                    product.quantity - 1 >= 1
                      ? product.quantity - 1
                      : product.quantity
                  )
                }
              >
                <Minus size={20} />
              </QuantityButton>
              <QuantityDisplay>{product.quantity}</QuantityDisplay>
              <QuantityButton
                onClick={() =>
                  handleQuantityUpdate(product.cartId, product.quantity + 1)
                }
              >
                <Plus size={20} />
              </QuantityButton>
            </QuantityContainer>
          </ProductInfo>
          <PriceInfo>
            <DeleteProductButton
              onClick={() => handleDeleteProduct(product.cartId)}
            >
              <X size={24} />
            </DeleteProductButton>
          </PriceInfo>
        </ProductContainer>
      ))}

      <TotalSection>
        <div>
          <TotalLabel>구매 금액</TotalLabel>
          <PriceLabel>할인 금액</PriceLabel>
          <PriceLabel>상품 금액</PriceLabel>
        </div>
        <div>
          <TotalLabel>{totalPrice.toLocaleString()}원</TotalLabel>
          <DiscountPrice>-{totalDiscount.toLocaleString()}원</DiscountPrice>
          <PriceLabel>{finalPrice.toLocaleString()}원</PriceLabel>
        </div>
      </TotalSection>

      <PurchaseButton onClick={handlePurchase}>주문하기</PurchaseButton>
    </CartContainer>
  )
}

export default Cart

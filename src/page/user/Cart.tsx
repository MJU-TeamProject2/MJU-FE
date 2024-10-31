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
  QuantityButton,
  AddressInputContainer,
  PaymentMethodContainer,
  InputGroup,
  InputLabel,
  InputField,
} from '@/component/styles/user/cartStyles'
import {
  getCartItems,
  deleteCartItem,
  updateCartItemQuantity,
} from '@/api/cartApi'
import {
  purchaseCartItems,
  Address,
  PaymentInfo,
  saveAddress,
} from '@/api/orderApi' // Address와 PaymentInfo 타입 import
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
  const [address, setAddress] = useState<Address>({
    addressId: 0,
    recipient: '',
    zipCode: '',
    baseAddress: '',
    detailAddress: '',
  })
  const [payment, setPayment] = useState<PaymentInfo>({
    cardNumber: '',
    cardProvider: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartItems = await getCartItems()
      const formattedProducts = cartItems.map((item) => ({
        cartId: item.cartId.toString(),
        id: item.clothesId.toString(),
        name: item.name,
        size: item.size,
        price:
          item.price * (item.discount === 0 ? 1 : (100 - item.discount) / 100),
        originalPrice: item.price,
        imageUrl: item.imageUrl,
        quantity: item.quantity,
        availableQuantity: item.availableQuantity,
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

  const handlePurchase = async () => {
    if (selectedProducts.length === 0) {
      alert('선택된 상품이 없습니다.')
      return
    }
    if (!address.recipient || !address.zipCode || !address.baseAddress) {
      alert('주소 정보를 모두 입력해 주세요.')
      return
    }
    if (!payment.cardNumber || !payment.cardProvider) {
      alert('결제 정보를 모두 입력해 주세요.')
      return
    }

    try {
      let addressId = address.addressId
      console.log(addressId)

      // 주소가 없을 경우 주소를 저장하고 반환된 addressId를 사용
      addressId = await saveAddress(address)
      console.log('Returned Address ID:', addressId)
      // 유효한 addressId로 주문 생성
      const modifiedAddress = { ...address, addressId }

      await purchaseCartItems(
        selectedProducts.map(Number),
        modifiedAddress,
        payment
      )

      // 구매 완료 후 장바구니에서 삭제
      await Promise.all(
        selectedProducts.map((id) => deleteCartItem(Number(id)))
      )
      setProducts([])
      setSelectedProducts([])

      alert('구매가 완료되었습니다!')
      navigate('/')
    } catch (error) {
      console.error('구매 중 오류가 발생했습니다:', error)
      alert('구매에 실패했습니다. 다시 시도해 주세요.')
    }
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
              <p style={{ textDecoration: 'line-through', color: '#767676' }}>
                {(product.originalPrice * product.quantity).toLocaleString()}원
              </p>
            )}
            <p style={{ fontWeight: 'bold', color: '#000' }}>
              {(product.price * product.quantity).toLocaleString()}원
            </p>
            <QuantityButton
              onClick={() =>
                handleQuantityUpdate(product.cartId, product.quantity + 1)
              }
            >
              수량 증가
            </QuantityButton>
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
              수량 감소
            </QuantityButton>
          </ProductInfo>
          <PriceInfo>
            <button onClick={() => handleDeleteProduct(product.cartId)}>
              X
            </button>
          </PriceInfo>
        </ProductContainer>
      ))}

      <AddressInputContainer>
        <p style={{ fontWeight: 'bold' }}>배송지 입력</p>
        <InputGroup>
          <InputLabel>받는 사람</InputLabel>
          <InputField
            type="text"
            value={address.recipient}
            onChange={(e) =>
              setAddress({ ...address, recipient: e.target.value })
            }
          />
        </InputGroup>
        <InputGroup>
          <InputLabel>우편번호</InputLabel>
          <InputField
            type="text"
            value={address.zipCode}
            maxLength={5}
            onChange={(e) =>
              setAddress({ ...address, zipCode: e.target.value })
            }
          />
        </InputGroup>
        <InputGroup>
          <InputLabel>기본 주소</InputLabel>
          <InputField
            type="text"
            value={address.baseAddress}
            onChange={(e) =>
              setAddress({ ...address, baseAddress: e.target.value })
            }
          />
        </InputGroup>
        <InputGroup>
          <InputLabel>상세 주소</InputLabel>
          <InputField
            type="text"
            value={address.detailAddress}
            onChange={(e) =>
              setAddress({ ...address, detailAddress: e.target.value })
            }
          />
        </InputGroup>
      </AddressInputContainer>

      <PaymentMethodContainer>
        <p style={{ fontWeight: 'bold' }}>결제 정보</p>
        <InputGroup>
          <InputLabel>카드 번호</InputLabel>
          <InputField
            type="text"
            value={payment.cardNumber}
            onChange={(e) =>
              setPayment({ ...payment, cardNumber: e.target.value })
            }
          />
        </InputGroup>
        <InputGroup>
          <InputLabel>카드 제공자</InputLabel>
          <InputField
            type="text"
            value={payment.cardProvider}
            onChange={(e) =>
              setPayment({ ...payment, cardProvider: e.target.value })
            }
          />
        </InputGroup>
      </PaymentMethodContainer>

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

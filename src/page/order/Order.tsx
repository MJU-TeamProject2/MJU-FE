import React, { useState, useEffect } from 'react'
import {
  OrderContainer,
  ProductContainer,
  ProductImage,
  ProductDetails,
  AddressContainer,
  AddressOption,
  RadioInput,
  AddressDetails,
  DeleteButton,
  NewEntryContainer,
  Label,
  InputField,
  PaymentContainer,
  PurchaseButton,
  AddButton,
} from '@/component/styles/order/orderStyles'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  deleteAddress,
  deletePayment,
  getAddresses,
  getPayments,
  postAddress,
  postPayment,
  purchaseCartItems,
} from '@/api/orderApi'

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

interface Address {
  addressId: number
  name: string
  recipient: string
  baseAddress: string
}

interface Payment {
  paymentId: number
  cardNumber: string
  cardProvider: string
}

const Order: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { products, finalPrice } = location.state as {
    products: Product[]
    finalPrice: number
  }

  const [addresses, setAddresses] = useState<Address[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<number | null>(null)

  const [addressForm, setAddressForm] = useState({
    name: '',
    recipient: '',
    zipCode: '',
    baseAddress: '',
    detailAddress: '',
  })
  const [zipCodeError, setZipCodeError] = useState<string>('') // 오류 메시지 상태 추가

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardProvider: '',
    expiryDate: '',
  })

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getAddresses()
        setAddresses(response)
      } catch (error) {
        console.error('주소 불러오기 오류:', error)
      }
    }
    fetchAddresses()
  }, [])

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await getPayments()
        setPayments(response)
      } catch (error) {
        console.error('결제수단 불러오기 오류:', error)
      }
    }
    fetchPayments()
  }, [])

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAddressForm({ ...addressForm, zipCode: value })

    // 유효성 검사: 5자리 숫자가 아니면 오류 메시지 설정
    if (!/^\d5}$/.test(value)) {
      setZipCodeError('우편번호는 5자리 숫자여야 합니다.')
    } else {
      setZipCodeError('')
    }
  }

  const handleAddAddress = async () => {
    if (zipCodeError) {
      alert('우편번호를 올바르게 입력해 주세요.')
      return
    }
    try {
      await postAddress(addressForm)
      setAddresses((prev) => [
        ...prev,
        { ...addressForm, addressId: Date.now() },
      ])
      setAddressForm({
        name: '',
        recipient: '',
        zipCode: '',
        baseAddress: '',
        detailAddress: '',
      })
    } catch (error) {
      console.error('주소 추가 오류:', error)
    }
  }

  const handleAddPayment = async () => {
    // 유효성 검사 추가
    if (
      !paymentForm.cardNumber ||
      !paymentForm.cardProvider ||
      !paymentForm.expiryDate
    ) {
      alert('모든 결제 정보를 입력해 주세요.')
      return
    }

    try {
      // 카드 번호 형식 검사
      if (!/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(paymentForm.cardNumber)) {
        alert('카드 번호는 "XXXX-XXXX-XXXX-XXXX" 형식이어야 합니다.')
        return
      }

      // 유효 기간 형식 검사
      if (!/^\d{2}\/\d{2}$/.test(paymentForm.expiryDate)) {
        alert('유효 기간은 "MM/YY" 형식이어야 합니다.')
        return
      }

      await postPayment({
        cardNumber: paymentForm.cardNumber,
        cardProvider: paymentForm.cardProvider,
        expiryDate: paymentForm.expiryDate,
      })

      setPayments((prev) => [
        ...prev,
        { ...paymentForm, paymentId: Date.now() },
      ])
      setPaymentForm({ cardNumber: '', cardProvider: '', expiryDate: '' })
    } catch (error) {
      console.error('결제수단 추가 오류:', error)
    }
  }

  const handleDeleteAddress = async (addressId: number) => {
    try {
      await deleteAddress(addressId)
      setAddresses((prev) =>
        prev.filter((address) => address.addressId !== addressId)
      )
    } catch (error) {
      console.error('주소 삭제 오류:', error)
    }
  }

  const handleDeletePayment = async (paymentId: number) => {
    try {
      await deletePayment(paymentId)
      setPayments((prev) =>
        prev.filter((payment) => payment.paymentId !== paymentId)
      )
    } catch (error) {
      console.error('결제수단 삭제 오류:', error)
    }
  }

  const handlePurchase = async () => {
    try {
      if (!selectedAddress || !selectedPayment) {
        alert('배송지와 결제수단을 선택하세요.')
        return
      }

      if (products.length === 0) {
        alert('구매할 상품이 없습니다.')
        return
      }

      await purchaseCartItems(products, selectedAddress, selectedPayment)
      alert('구매가 완료되었습니다!')
      navigate('/')
    } catch (error) {
      console.error('구매 오류:', error)
      alert('구매에 실패했습니다. 다시 시도해 주세요.')
    }
  }

  return (
    <OrderContainer>
      <h1>주문 상품 목록</h1>
      {products.map((product) => (
        <ProductContainer key={product.cartId}>
          <ProductImage src={product.imageUrl} alt={product.name} />
          <ProductDetails>상품명: {product.name}</ProductDetails>
          <ProductDetails>수량: {product.quantity}개</ProductDetails>
          <ProductDetails>
            가격: {(product.price * product.quantity).toLocaleString()}원
          </ProductDetails>
        </ProductContainer>
      ))}

      <h1>배송지 선택</h1>
      <AddressContainer>
        {addresses.map((address) => (
          <AddressOption key={address.addressId}>
            <RadioInput
              type="radio"
              name="address"
              checked={selectedAddress === address.addressId}
              onChange={() => setSelectedAddress(address.addressId)}
            />
            <AddressDetails>
              <p>배송지 이름: {address.name}</p>
              <p>수취인: {address.recipient}</p>
              <p>주소: {address.baseAddress}</p>
            </AddressDetails>
            <DeleteButton
              onClick={() => handleDeleteAddress(address.addressId)}
            >
              삭제
            </DeleteButton>
          </AddressOption>
        ))}
      </AddressContainer>

      <NewEntryContainer>
        <h3>새 배송지 추가</h3>
        <Label>배송지 이름</Label>
        <InputField
          placeholder="배송지 이름"
          value={addressForm.name}
          onChange={(e) =>
            setAddressForm({ ...addressForm, name: e.target.value })
          }
        />
        <Label>수취인</Label>
        <InputField
          placeholder="수취인"
          value={addressForm.recipient}
          onChange={(e) =>
            setAddressForm({ ...addressForm, recipient: e.target.value })
          }
        />
        <Label>우편번호</Label>
        <InputField
          placeholder="우편번호"
          value={addressForm.zipCode}
          onChange={handleZipCodeChange} // 유효성 검사 함수 적용
        />
        {zipCodeError && <p style={{ color: 'red' }}>{zipCodeError}</p>}{' '}
        {/* 오류 메시지 출력 */}
        <Label>기본 주소</Label>
        <InputField
          placeholder="기본 주소"
          value={addressForm.baseAddress}
          onChange={(e) =>
            setAddressForm({ ...addressForm, baseAddress: e.target.value })
          }
        />
        <Label>상세 주소</Label>
        <InputField
          placeholder="상세 주소"
          value={addressForm.detailAddress}
          onChange={(e) =>
            setAddressForm({ ...addressForm, detailAddress: e.target.value })
          }
        />
        <AddButton onClick={handleAddAddress}>추가하기</AddButton>
      </NewEntryContainer>

      <h1>결제수단 선택</h1>
      <PaymentContainer>
        {payments.map((payment) => (
          <AddressOption key={payment.paymentId}>
            <RadioInput
              type="radio"
              name="payment"
              checked={selectedPayment === payment.paymentId}
              onChange={() => setSelectedPayment(payment.paymentId)}
            />
            <AddressDetails>
              <p>카드 번호: {payment.cardNumber}</p>
              <p>카드사: {payment.cardProvider}</p>
            </AddressDetails>
            <DeleteButton
              onClick={() => handleDeletePayment(payment.paymentId)}
            >
              삭제
            </DeleteButton>
          </AddressOption>
        ))}
      </PaymentContainer>

      <NewEntryContainer>
        <h3>새 결제수단 추가</h3>
        <Label>카드 번호</Label>
        <InputField
          placeholder="카드 번호"
          value={paymentForm.cardNumber}
          onChange={(e) =>
            setPaymentForm({ ...paymentForm, cardNumber: e.target.value })
          }
        />
        <Label>카드사</Label>
        <InputField
          placeholder="카드사"
          value={paymentForm.cardProvider}
          onChange={(e) =>
            setPaymentForm({ ...paymentForm, cardProvider: e.target.value })
          }
        />
        <Label>유효기간</Label>
        <InputField
          placeholder="유효기간 (MM/YY)"
          value={paymentForm.expiryDate}
          onChange={(e) =>
            setPaymentForm({ ...paymentForm, expiryDate: e.target.value })
          }
        />
        <AddButton onClick={handleAddPayment}>추가하기</AddButton>
      </NewEntryContainer>

      <PurchaseButton
        onClick={handlePurchase}
        disabled={!selectedAddress || !selectedPayment}
      >
        {finalPrice.toLocaleString()}원 결제하기
      </PurchaseButton>
    </OrderContainer>
  )
}

export default Order

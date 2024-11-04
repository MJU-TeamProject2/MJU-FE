// Order.tsx
import React, { useState, useEffect } from 'react'
import { Address, PaymentInfo, getAdress, getPayment, purchaseCartItems } from '@/api/orderApi'

import { OrderContainer, SelectButton, OptionContainer } from '@/component/styles/order/orderStyles'
import PaymentForm from '@/page/order/PaymentForm.tsx'
import AddressForm from '@/page/order/AddressForm.tsx'

interface OrderProps {
  selectedProducts: string[]
  setProducts: React.Dispatch<React.SetStateAction<any[]>>
  setSelectedProducts: React.Dispatch<React.SetStateAction<string[]>>
}

const Order: React.FC<OrderProps> = ({ selectedProducts, setProducts, setSelectedProducts }) => {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [payments, setPayments] = useState<PaymentInfo[]>([])
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<PaymentInfo | null>(null)
  const [newAddress, setNewAddress] = useState<Address>({
    addressId: 0,
    recipient: '',
    zipCode: '',
    baseAddress: '',
    detailAddress: '',
  })
  const [newPayment, setNewPayment] = useState<PaymentInfo>({
    cardNumber: '',
    cardProvider: '',
    expiryDate: '12/25',
  })

  useEffect(() => {
    // Fetch existing addresses and payment methods
    const fetchAddresses = async () => {
      const fetchedAddresses = await getAdress()
      setAddresses(fetchedAddresses)
    }

    const fetchPayments = async () => {
      const fetchedPayments = await getPayment()
      setPayments(fetchedPayments)
    }

    fetchAddresses()
    fetchPayments()
  }, [])

  const handleOrderSubmission = async () => {
    if (selectedProducts.length === 0 || !selectedAddress || !selectedPayment) {
      alert('모든 필드를 선택 또는 입력해주세요.')
      return
    }

    try {
      await purchaseCartItems(selectedProducts.map(Number))
      setProducts([])
      setSelectedProducts([])
      alert('주문이 완료되었습니다!')
    } catch (error) {
      console.error('주문 중 오류 발생:', error)
      alert('주문에 실패했습니다. 다시 시도해 주세요.')
    }
  }

  return (
    <OrderContainer>
      {/* Existing Address Selection */}
      <OptionContainer>
        <h3>기존 주소 선택</h3>
        {addresses.map((address) => (
          <div key={address.addressId}>
            <input
              type="radio"
              name="address"
              checked={selectedAddress?.addressId === address.addressId}
              onChange={() => setSelectedAddress(address)}
            />
            <label>
              {address.recipient}, {address.baseAddress} {address.detailAddress}, {address.zipCode}
            </label>
          </div>
        ))}
      </OptionContainer>

      {/* New Address Form */}
      <h3>새 주소 추가</h3>
      <AddressForm address={newAddress} setAddress={setNewAddress} />

      {/* Existing Payment Method Selection */}
      <OptionContainer>
        <h3>기존 결제 수단 선택</h3>
        {payments.map((payment, index) => (
          <div key={index}>
            <input
              type="radio"
              name="payment"
              checked={selectedPayment?.cardNumber === payment.cardNumber}
              onChange={() => setSelectedPayment(payment)}
            />
            <label>
              {payment.cardProvider} 카드 끝자리 {payment.cardNumber.slice(-4)}
            </label>
          </div>
        ))}
      </OptionContainer>

      {/* New Payment Method Form */}
      <h3>새 결제 수단 추가</h3>
      <PaymentForm payment={newPayment} setPayment={setNewPayment} />

      {/* Order Submission Button */}
      <SelectButton onClick={handleOrderSubmission}>구매하기</SelectButton>
    </OrderContainer>
  )
}

export default Order

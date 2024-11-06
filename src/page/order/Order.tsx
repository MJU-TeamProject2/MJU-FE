import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AddressInfo, PaymentInfo, getPayment, getAddress, createOrder } from '@/api/orderApi'

import { OrderContainer, SelectButton, OptionContainer } from '@/component/styles/order/orderStyles'
import PaymentForm from '@/page/order/PaymentForm.tsx'
import AddressForm from '@/page/order/AddressForm.tsx'

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedProducts = location.state?.products || [];

  const [addresses, setAddresses] = useState<AddressInfo[]>([])
  const [payments, setPayments] = useState<PaymentInfo[]>([])
  const [selectedAddress, setSelectedAddress] = useState<AddressInfo | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<PaymentInfo | null>(null)
  const [newAddress, setNewAddress] = useState<AddressInfo>()
  const [newPayment, setNewPayment] = useState<PaymentInfo>()
  const [loading, setLoading] = useState(true)
  const [useNewAddress, setUseNewAddress] = useState(false)
  const [useNewPayment, setUseNewPayment] = useState(false)

  useEffect(() => {
    if (!selectedProducts.length) {
      alert('선택된 상품이 없습니다.');
      navigate('/cart');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [addressResponse, paymentResponse] = await Promise.all([
          getAddress(),
          getPayment()
        ]);

        setAddresses(addressResponse.data);
        setPayments(paymentResponse.data);

        // 기본값 설정
        if (addressResponse.data.length > 0) {
          setSelectedAddress(addressResponse.data[0]);
        }
        if (paymentResponse.data.length > 0) {
          setSelectedPayment(paymentResponse.data[0]);
        }
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
        alert('데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedProducts, navigate]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === 'new') {
      setUseNewAddress(true)
      setSelectedAddress(null)
    } else {
      setUseNewAddress(false)
      const selected = addresses.find(addr => addr.addressId === Number(value))
      if (selected) {
        setSelectedAddress(selected)
      }
    }
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === 'new') {
      setUseNewPayment(true)
      setSelectedPayment(null)
    } else {
      setUseNewPayment(false)
      const selected = payments.find(payment => payment.paymentId === Number(value))
      if (selected) {
        setSelectedPayment(selected)
      }
    }
  }

  const handleOrderSubmission = async () => {
    if (selectedProducts.length === 0) {
      alert('선택된 상품이 없습니다.')
      return
    }

    const finalAddress = useNewAddress ? newAddress : selectedAddress
    const finalPayment = useNewPayment ? newPayment : selectedPayment

    if (!finalAddress || !finalPayment) {
      alert('배송지와 결제 수단을 모두 선택해주세요.')
      return
    }

    try {
      await createOrder(selectedProducts, finalAddress.addressId, finalPayment.paymentId)
      alert('주문이 완료되었습니다!')
      navigate('/orderHistory')
    } catch (error) {
      console.error('주문 중 오류 발생:', error)
      alert('주문에 실패했습니다. 다시 시도해 주세요.')
    }
  }

  if (loading) return <div>로딩 중...</div>;

  return (
      <OrderContainer>
        {/* Address Selection */}
        <OptionContainer>
          <h3>배송지 선택</h3>
          <select
              value={useNewAddress ? 'new' : selectedAddress?.addressId || ''}
              onChange={handleAddressChange}
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
          >
            <option value="">배송지를 선택해주세요</option>
            {addresses.map((address) => (
                <option key={address.addressId} value={address.addressId}>
                  {address.recipient} - {address.baseAddress} {address.detailAddress}
                </option>
            ))}
            <option value="new">새로운 배송지 입력</option>
          </select>
        </OptionContainer>

        {/* New Address Form */}
        {useNewAddress && (
            <>
              <h3>새 배송지 정보</h3>
              <AddressForm address={newAddress} setAddress={setNewAddress} />
            </>
        )}

        {/* Payment Selection */}
        <OptionContainer>
          <h3>결제 수단 선택</h3>
          <select
              value={useNewPayment ? 'new' : selectedPayment?.paymentId || ''}
              onChange={handlePaymentChange}
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
          >
            <option value="">결제 수단을 선택해주세요</option>
            {payments.map((payment) => (
                <option key={payment.paymentId} value={payment.paymentId}>
                  {payment.cardProvider} 카드 끝자리 {payment.cardNumber.slice(-4)}
                </option>
            ))}
            <option value="new">새로운 결제 수단 입력</option>
          </select>
        </OptionContainer>

        {/* New Payment Form */}
        {useNewPayment && (
            <>
              <h3>새 결제 수단 정보</h3>
              <PaymentForm payment={newPayment} setPayment={setNewPayment} />
            </>
        )}

        {/* Order Submission Button */}
        <SelectButton onClick={handleOrderSubmission}>구매하기</SelectButton>
      </OrderContainer>
  )
}

export default Order
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

  const handleOrderSubmission = async () => {
    if (selectedProducts.length === 0 || !selectedAddress || !selectedPayment) {
      alert('모든 필드를 선택 또는 입력해주세요.')
      return
    }

    try {

      await createOrder(selectedProducts, selectedAddress.addressId, selectedPayment.paymentId)
      alert('주문이 완료되었습니다!')
      navigate('/orderHistory'); // 주문 완료 후 주문 내역 페이지로 이동
    } catch (error) {
      console.error('주문 중 오류 발생:', error)
      alert('주문에 실패했습니다. 다시 시도해 주세요.')
    }
  }

  if (loading) return <div>로딩 중...</div>;

  return (
      <OrderContainer>
        {/* Existing Address Selection */}
        <OptionContainer>
          <h3>기존 주소 선택</h3>
          {addresses.length === 0 ? (
              <p>저장된 주소가 없습니다.</p>
          ) : (
              addresses.map((address) => (
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
              ))
          )}
        </OptionContainer>

        {/* New Address Form */}
        <h3>새 주소 추가</h3>
        <AddressForm address={newAddress} setAddress={setNewAddress} />

        {/* Existing Payment Method Selection */}
        <OptionContainer>
          <h3>기존 결제 수단 선택</h3>
          {payments.length === 0 ? (
              <p>저장된 결제 수단이 없습니다.</p>
          ) : (
              payments.map((payment, index) => (
                  <div key={index}>
                    <input
                        type="radio"
                        name="payment"
                        checked={selectedPayment?.paymentId === payment.paymentId}
                        onChange={() => setSelectedPayment(payment)}
                    />
                    <label>
                      {payment.cardProvider} 카드 끝자리 {payment.cardNumber.slice(-4)}
                    </label>
                  </div>
              ))
          )}
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
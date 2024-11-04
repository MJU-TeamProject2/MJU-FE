// PaymentForm.tsx
import React from 'react'
import { PaymentInfo } from '@/api/orderApi'
import { PaymentMethodContainer } from '@/component/styles/user/cartStyles'

interface PaymentFormProps {
  payment: PaymentInfo
  setPayment: React.Dispatch<React.SetStateAction<PaymentInfo>>
}

const PaymentForm: React.FC<PaymentFormProps> = ({ payment, setPayment }) => {
  return (
    <PaymentMethodContainer>
      <p style={{ fontWeight: 'bold' }}>결제 정보</p>
      <input
        type="text"
        placeholder="카드 번호"
        value={payment.cardNumber}
        onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
      />
      <input
        type="text"
        placeholder="카드 제공자"
        value={payment.cardProvider}
        onChange={(e) => setPayment({ ...payment, cardProvider: e.target.value })}
      />
    </PaymentMethodContainer>
  )
}

export default PaymentForm

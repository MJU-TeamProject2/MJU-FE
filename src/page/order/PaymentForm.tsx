import React from 'react'
import { PaymentInfo } from '@/api/orderApi'
import { PaymentMethodContainer } from '@/component/styles/user/cartStyles'

interface PaymentFormProps {
    payment: PaymentInfo | null | undefined
    setPayment: React.Dispatch<React.SetStateAction<PaymentInfo>>
}

const PaymentForm: React.FC<PaymentFormProps> = ({ payment, setPayment }) => {
    const defaultPayment: { cardId: number; cardProvider: string; cardNumber: string } = {
        cardId: 0,
        cardNumber: '',
        cardProvider: '',
    }

    const currentPayment = payment || defaultPayment

    return (
        <PaymentMethodContainer>
            <p style={{ fontWeight: 'bold' }}>결제 정보</p>
            <input
                type="text"
                placeholder="카드 번호"
                value={currentPayment.cardNumber}
                onChange={(e) =>
                    setPayment({ ...currentPayment, cardNumber: e.target.value })
                }
            />
            <input
                type="text"
                placeholder="카드 제공자"
                value={currentPayment.cardProvider}
                onChange={(e) =>
                    setPayment({ ...currentPayment, cardProvider: e.target.value })
                }
            />
        </PaymentMethodContainer>
    )
}

export default PaymentForm
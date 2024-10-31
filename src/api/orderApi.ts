import axiosInstance from './axiosInstance'

// API 응답 타입 정의
export type ApiResponse<T> = {
  success: boolean
  data: T
  message?: string // 선택적 메시지 필드
}

// 주문 항목 타입 정의
export type OrderItem = {
  orderId: number
  clothesId: number
  imageUrl: string
  name: string
  quantity: number
  price: number
  discount: number
  size: string
  orderStatus: string
  createdAt: string // 생성 일자 추가
}

// 주소 타입 정의
export type Address = {
  addressId: number
  recipient: string
  zipCode: string
  baseAddress: string
  detailAddress: string
}

// 결제 정보 타입 정의
export type PaymentInfo = {
  cardNumber: string // 문자열로 수신
  cardProvider: string
}

export const createOrder = async (
  cartId: number, // 단일 장바구니 항목 ID
  addressId: number, // 주소 ID
  payment: PaymentInfo // PaymentInfo 객체
): Promise<ApiResponse<{}>> => {
  const response: ApiResponse<{}> = await axiosInstance.post('/api/v1/orders', {
    cartId: cartId,
    AddressId: addressId,
    paymentId: Number(payment.cardNumber), // 문자열을 숫자로 변환하여 전송
  })
  return response
}

export const saveAddress = async (address: Address): Promise<number> => {
  const requestBody = {
    name: '회사', // 예시로 고정된 이름
    recipient: address.recipient,
    zipCode: address.zipCode,
    baseAddress: address.baseAddress,
    detailAddress: address.detailAddress,
  }

  try {
    const response = await axiosInstance.post(
      '/api/v1/customer/address',
      requestBody
    )
    console.log('Address saved successfully:', response.data)
    return Number(address.zipCode) // 정상적으로 저장되었을 경우 addressId 반환
  } catch (error) {
    console.error('Error saving address:', error)
    throw error // 오류를 상위로 전달하여 handlePurchase에서 처리되도록 함
  }
}

// 구매 처리 함수
export const purchaseCartItems = async (
  selectedCartIds: number[],
  address: Address,
  payment: PaymentInfo
): Promise<ApiResponse<{}>> => {
  const promises = selectedCartIds.map((cartId) =>
    createOrder(cartId, address.addressId, payment)
  )
  console.log('123123123')
  const responses = await Promise.all(promises)

  if (responses.every((res) => res.success)) {
    return {
      success: true,
      data: {},
    }
  } else {
    return {
      success: false,
      data: {},
    }
  }
}

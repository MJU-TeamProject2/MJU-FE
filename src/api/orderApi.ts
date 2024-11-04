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
  expiryDate: string
}

export const createOrder = async (
  cartId: number,
  addressId: number,
  paymentId: number
): Promise<ApiResponse<{}>> => {
  const response: ApiResponse<{}> = await axiosInstance.post('/api/v1/orders', {
    cartId: cartId,
    AddressId: addressId,
    paymentId: paymentId,
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
//등록 주소 조회
export const getAdress = async (): Promise<[]> => {
  try {
    const response = await axiosInstance.get('/api/v1/customer/address')
    console.log('<hojji>  getAdress response ===>>>   ', response.data)
    return response.data
  } catch (error) {
    throw error
  }
}
//카드 조회
export const getPayment = async (): Promise<[]> => {
  try {
    const response = await axiosInstance.get('/api/v1/customer/payment')
    console.log('<hojji>  getPayment response ===>>>   ', response.data)
    return response.data
  } catch (error) {
    throw error
  }
}
//카드 등록
export const savePayment = async (payment: PaymentInfo): Promise<[]> => {
  const body = {
    cardNumber: payment.cardNumber,
    cardProvider: payment.cardProvider,
    expiryDate: '12/25',
  }
  try {
    const response = await axiosInstance.post('/api/v1/customer/payment', body)
    console.log('<hojji>   response ===>>>   ', response.data)
    return response.data
  } catch (error) {
    throw error
  }
}

// 구매 처리 함수
export const purchaseCartItems = async (
  selectedCartIds: number[]
): Promise<ApiResponse<{}>> => {
  const promises = selectedCartIds.map((cartId) =>
    createOrder(cartId, 2, 1)
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

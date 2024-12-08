import axiosInstance from '@/services/axiosInstance'

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

interface Order {
  orderId: number
  clothesId: number
  imageUrl: string
  detailUrl: string
  name: string
  quantity: number
  price: number
  discount: number
  size: string
  orderStatus: string
  createdAt: string
}

export const purchaseCartItems = async (
  selectedItems: Product[],
  addressId: number,
  paymentId: number
): Promise<void> => {
  if (selectedItems.length === 0) {
    console.log('선택된 상품이 없습니다.')
    return
  }

  try {
    console.log('구매 요청 시작:', { selectedItems, addressId, paymentId })

    await Promise.all(
      selectedItems.map(async (product) => {
        const response = await axiosInstance.post('/api/v1/orders', {
          cartId: product.cartId,
          addressId,
          paymentId,
        })
        console.log(`상품 주문 성공: ${product.name}`, response.data)
      })
    )

    console.log('구매 처리가 완료되었습니다.')
  } catch (error: any) {
    console.error('구매 처리 중 오류:', error)
    handleApiError(error)
    throw error
  }
}

export const postAddress = async ({
  name,
  recipient,
  zipCode,
  baseAddress,
  detailAddress,
}: {
  name: string
  recipient: string
  zipCode: string
  baseAddress: string
  detailAddress: string
}): Promise<void> => {
  try {
    const response = await axiosInstance.post('/api/v1/customer/address', {
      name,
      recipient,
      zipCode,
      baseAddress,
      detailAddress,
    })
    console.log('주소 추가 완료:', response.data)
  } catch (error: any) {
    console.error('주소 추가 중 오류:', error)
    handleApiError(error)
  }
}

export const getAddresses = async (): Promise<
  {
    addressId: number
    name: string
    recipient: string
    baseAddress: string
  }[]
> => {
  try {
    const response = await axiosInstance.get('/api/v1/customer/address')
    console.log('주소 조회 성공:', response.status, response.data)
    return response.data
  } catch (error: any) {
    console.error('주소 조회 중 오류:', error)
    handleApiError(error)
    return []
  }
}

export const postPayment = async ({
  cardNumber,
  cardProvider,
  expiryDate,
}: {
  cardNumber: string
  cardProvider: string
  expiryDate: string
}): Promise<void> => {
  try {
    const response = await axiosInstance.post('/api/v1/customer/payment', {
      cardNumber,
      cardProvider,
      expiryDate,
    })
    console.log('결제수단 추가 완료:', response.data)
  } catch (error: any) {
    console.error('결제수단 추가 중 오류:', error)
    handleApiError(error)
  }
}

export const getPayments = async (): Promise<
  {
    paymentId: number
    cardNumber: string
    cardProvider: string
  }[]
> => {
  try {
    const response = await axiosInstance.get('/api/v1/customer/payment')
    console.log('결제 수단 조회 성공:', response.status, response.data)
    return response.data
  } catch (error: any) {
    console.error('결제수단 조회 중 오류:', error)
    handleApiError(error)
    return []
  }
}

export const deleteAddress = async (addressId: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/customer/address/${addressId}`
    )
    console.log('주소 삭제 완료:', response.data)
  } catch (error: any) {
    console.error('주소 삭제 중 오류:', error)
    handleApiError(error)
  }
}

export const deletePayment = async (paymentId: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/customer/payment/${paymentId}`
    )
    console.log('결제수단 삭제 완료:', response.data)
  } catch (error: any) {
    console.error('결제수단 삭제 중 오류:', error)
    handleApiError(error)
  }
}

export const getAdminOrders = async (
  memberId?: number,
  page: number = 0,
  size: number = 20
): Promise<Order[]> => {
  try {
    const params = { memberId, page, size }
    const response = await axiosInstance.get('/api/v1/admin/orders', { params })
    console.log('관리자 주문 목록 조회 성공:', response.data)
    return response.data.map((order: any) => ({
      orderId: order.orderId,
      clothesId: order.clothesId,
      imageUrl: order.imageUrl,
      detailUrl: order.detailUrl,
      name: order.name,
      quantity: order.quantity,
      price: order.price,
      discount: order.discount,
      size: order.size,
      orderStatus: order.orderStatus,
      createdAt: order.createdAt,
    }))
  } catch (error: any) {
    console.error('관리자 주문 조회 중 오류:', error)
    handleApiError(error)
    return []
  }
}

export const updateAdminOrder = async (
  orderId: number,
  updatedData: { orderStatus: string }
): Promise<void> => {
  try {
    const response = await axiosInstance.patch('/api/v1/admin/orders', {
      orderId,
      ...updatedData,
    })
    console.log('주문 상태 업데이트 성공:', response.data)
  } catch (error: any) {
    console.error('주문 상태 업데이트 중 오류:', error)
    handleApiError(error)
  }
}

export const deleteAdminOrder = async (orderId: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/admin/orders/${orderId}`
    )
    console.log('관리자 주문 삭제 성공:', response.data)
  } catch (error: any) {
    console.error('관리자 주문 삭제 중 오류:', error)
    handleApiError(error)
  }
}

const handleApiError = (error: any) => {
  if (error.response) {
    console.error('서버 응답 오류:', error.response)
  } else if (error.request) {
    console.error('요청 오류:', error.request)
  } else {
    console.error('알 수 없는 오류:', error.message)
  }
}

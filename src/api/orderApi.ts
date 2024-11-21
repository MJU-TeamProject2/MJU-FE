import axiosInstance from '@/api/axiosInstance'

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
    await Promise.all(
      selectedItems.map((product) =>
        axiosInstance.post('/api/v1/orders', {
          cartId: product.cartId,
          addressId,
          paymentId,
        })
      )
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
    await axiosInstance.post('/api/v1/customer/address', {
      name,
      recipient,
      zipCode,
      baseAddress,
      detailAddress,
    })
    console.log('주소 추가가 완료되었습니다.')
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
    console.log('주소 조회 응답 상태:', response.status)
    console.log('주소 조회 응답 데이터:', response.data)

    return response.data
  } catch (error: any) {
    console.error('주소 불러오기 중 오류:', error)
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
    await axiosInstance.post('/api/v1/customer/payment', {
      cardNumber,
      cardProvider,
      expiryDate,
    })
    console.log('결제수단 추가가 완료되었습니다.')
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
    console.log('결제 수단 조회 응답 상태:', response.status)
    console.log('결제 수단 조회 응답 데이터:', response.data)

    return response.data
  } catch (error: any) {
    console.error('결제수단 불러오기 중 오류:', error)
    handleApiError(error)
    return []
  }
}

export const deleteAddress = async (addressId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/v1/customer/address/${addressId}`)
    console.log('주소 삭제가 완료되었습니다.')
  } catch (error: any) {
    console.error('주소 삭제 중 오류:', error)
    handleApiError(error)
  }
}

export const deletePayment = async (paymentId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/v1/customer/payment/${paymentId}`)
    console.log('결제수단 삭제가 완료되었습니다.')
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

    console.log('관리자 주문 목록 조회 응답 상태:', response.status)
    console.log('관리자 주문 목록 조회 응답 데이터:', response.data)

    const data = response.data
    if (data && Array.isArray(data)) {
      return data.map((order: any) => ({
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
    } else {
      console.error('API Error: 데이터 형식 불일치', data)
      return []
    }
  } catch (error: any) {
    console.error('API 호출 중 오류:', error)
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
    console.log('관리자용 주문 상태 수정 응답 상태:', response.status)
    console.log('관리자용 주문 상태 수정 응답 데이터:', response.data)
  } catch (error: any) {
    console.error('관리자용 주문 상태 수정 중 오류가 발생했습니다.', error)
    handleApiError(error)
  }
}

export const deleteAdminOrder = async (orderId: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/admin/orders/${orderId}`
    )
    console.log('관리자용 주문 삭제 응답 상태:', response.status)
    console.log('관리자용 주문 삭제 응답 데이터:', response.data)
  } catch (error: any) {
    console.error('관리자용 주문 삭제 중 오류가 발생했습니다.', error)
    handleApiError(error)
  }
}

const handleApiError = (error: any) => {
  if (error.response) {
    console.error(
      '서버 응답 오류:',
      `Status: ${error.response.status}`,
      `Data: ${JSON.stringify(error.response.data)}`,
      `Headers: ${JSON.stringify(error.response.headers)}`
    )
  } else if (error.request) {
    console.error('요청이 전송되었지만 응답을 받지 못했습니다:', error.request)
  } else {
    console.error('요청 설정 중 오류:', error.message)
  }
}

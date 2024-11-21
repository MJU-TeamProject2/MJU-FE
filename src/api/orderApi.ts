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
  name: string
  quantity: number
  price: number
  detailUrl: string
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
    const productIds = selectedItems.map((product) => Number(product.cartId))
    console.log('구매할 상품 IDs:', productIds.join(', '))

    await Promise.all(
      selectedItems.map((product: Product) =>
        axiosInstance.post('/api/v1/orders', {
          cartId: product.cartId,
          addressId,
          paymentId,
        })
      )
    )

    console.log('구매 처리가 완료되었습니다.')
  } catch (error) {
    console.error('구매 처리 중 오류가 발생했습니다.', error)
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
  } catch (error) {
    console.error('주소 추가 중 오류가 발생했습니다.', error)
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
    const { data } = await axiosInstance.get('/api/v1/customer/address')
    console.log('주소 불러오기가 완료되었습니다.')
    return data
  } catch (error) {
    console.error('주소 불러오기 중 오류가 발생했습니다.', error)
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
    console.log('전송할 데이터:', {
      cardNumber,
      cardProvider,
      expiryDate,
    })

    await axiosInstance.post('/api/v1/customer/payment', {
      cardNumber,
      cardProvider,
      expiryDate,
    })
    console.log('결제수단 추가가 완료되었습니다.')
  } catch (error: any) {
    if (error.response) {
      console.error('서버에서 반환된 오류:', error.response.data)
    } else {
      console.error('결제수단 추가 중 오류가 발생했습니다:', error.message)
    }
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
    const { data } = await axiosInstance.get('/api/v1/customer/payment')
    console.log('결제수단 불러오기가 완료되었습니다.')
    return data
  } catch (error) {
    console.error('결제수단 불러오기 중 오류가 발생했습니다.', error)
    return []
  }
}

export const deleteAddress = async (addressId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/v1/customer/address/${addressId}`)
    console.log('주소 삭제가 완료되었습니다.')
  } catch (error) {
    console.error('주소 삭제 중 오류가 발생했습니다.', error)
  }
}

export const deletePayment = async (paymentId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/v1/customer/payment/${paymentId}`)
    console.log('결제수단 삭제가 완료되었습니다.')
  } catch (error) {
    console.error('결제수단 삭제 중 오류가 발생했습니다.', error)
  }
}

export const getOrders = async (): Promise<Order[]> => {
  try {
    const { data } = await axiosInstance.get('/api/v1/orders')

    if (data.success) {
      console.log('주문 목록을 성공적으로 가져왔습니다.', data.data)
      return data.data.map((order: any) => ({
        orderId: order.orderId,
        clothesId: order.clothesId,
        imageUrl: order.imageUrl,
        name: order.name,
        quantity: order.quantity,
        price: order.price,
        detailUrl: order.detailUrl,
        discount: order.discount,
        size: order.size,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt,
      }))
    } else {
      console.error('주문 목록을 가져오는 중 오류가 발생했습니다.', data)
      return []
    }
  } catch (error) {
    console.error('주문 목록을 가져오는 중 오류가 발생했습니다.', error)
    return []
  }
}

export const updateOrder = async (
  orderId: number,
  updatedData: Partial<Order>
): Promise<void> => {
  try {
    await axiosInstance.put(`/api/v1/orders/${orderId}`, updatedData)
    console.log('주문이 수정되었습니다.')
  } catch (error) {
    console.error('주문 수정 중 오류가 발생했습니다.', error)
  }
}

export const deleteOrder = async (orderId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/v1/orders/${orderId}`)
    console.log('주문이 삭제되었습니다.')
  } catch (error) {
    console.error('주문 삭제 중 오류가 발생했습니다.', error)
  }
}

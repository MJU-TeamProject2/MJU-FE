import axiosInstance, { ApiResponse } from './axiosInstance'

export type CartItem = {
  cartId: number
  clothesId: number
  imageUrl: string
  detailUrl: string
  name: string
  price: number
  quantity: number
  size: string
  discount: number
  availableQuantity: number
  clothesSizeList: { size: string; quantity: number }[]
}

export const getCartItems = async (): Promise<CartItem[]> => {
  const response: ApiResponse<{ data: CartItem[] }> =
    await axiosInstance.get('/api/v1/carts')

  if (response.success && Array.isArray(response.data)) {
    return response.data.map((item) => ({
      ...item,
    }))
  } else {
    console.log('장바구니에 상품이 없습니다.')
    return []
  }
}

export const postCartItems = async (
  clothesId: string,
  size: string,
  quantity: number = 1
): Promise<void> => {
  const response: ApiResponse<void | { code: string; message: string }> =
    await axiosInstance.post('/api/v1/carts', { clothesId, size, quantity })
  if (!response.success) {
    if (response.data && response.data.code === 'CT001') {
      console.error('해당 옷을 찾을 수 없습니다.')
    } else {
      console.error('업데이트에 실패했습니다.')
    }
  } else {
    console.log('장바구니가 성공적으로 업데이트되었습니다.')
  }
}

export const deleteCartItem = async (cartId: number): Promise<void> => {
  const response: ApiResponse<void | { code: string; message: string }> =
    await axiosInstance.delete(`/api/v1/carts/${cartId}`)

  if (!response.success) {
    if (response.data && response.data.code === 'CT001') {
      console.error('해당 옷을 찾을 수 없습니다.')
    } else {
      console.error('상품 삭제에 실패했습니다.')
    }
  } else {
    console.log('상품이 성공적으로 삭제되었습니다.')
  }
}

export const updateCartItemQuantity = async (
  cartId: number,
  quantity: number
): Promise<void> => {
  const response: ApiResponse<void | { code: string; message: string }> =
    await axiosInstance.patch('/api/v1/carts', { cartId, quantity })

  if (!response.success) {
    if (response.data && response.data.code === 'CT001') {
      console.error('해당 옷을 찾을 수 없습니다.')
    } else {
      console.error('상품 수량 업데이트에 실패했습니다.')
    }
  } else {
    console.log('상품 수량이 성공적으로 업데이트되었습니다.')
  }
}

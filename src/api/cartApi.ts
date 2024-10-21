import axiosInstance, { ApiResponse } from './axiosInstance'

export type CartItem = {
  clothesId: number
  imageUrl: string
  detailUrl: string
  name: string
  price: number
  discount: number
  clothesSizeList: { size: string; quantity: number }[]
}

// 장바구니 목록 조회
export const getCartItems = async (): Promise<CartItem[]> => {
  const response: ApiResponse<{ data: CartItem[] }> =
    await axiosInstance.get('/api/v1/carts')

  if (response.success && Array.isArray(response.data)) {
    return response.data.map((item) => ({
      ...item,
      quantity: 1,
    }))
  } else {
    console.log('장바구니에 상품이 없습니다.')
    return []
  }
}

export const postCartItems = async (clothesId: string): Promise<void> => {
  const response: ApiResponse<void | { code: string; message: string }> =
    await axiosInstance.post('/api/v1/carts', { clothesId })
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

// 장바구니 상품 삭제
export const deleteCartItem = async (clothesId: number): Promise<void> => {
  const response: ApiResponse<void | { code: string; message: string }> =
    await axiosInstance.delete(`/api/v1/carts/${clothesId}`)

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

// 장바구니 상품 수량 업데이트
export const updateCartItemQuantity = async (
  clothesId: number,
  quantity: number
): Promise<void> => {
  const response: ApiResponse<void | { code: string; message: string }> =
    await axiosInstance.patch('/api/v1/carts', { clothesId, quantity })

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

// 장바구니 상품 구매 미완성, api 아직 구현 안 됨.
export const purchaseCartItems = async (
  selectedItems: string[]
): Promise<void> => {
  if (selectedItems.length === 0) {
    console.log('선택된 상품이 없습니다.')
    return
  }

  try {
    console.log('구매할 상품 IDs:', selectedItems.join(', '))
    console.log('구매 처리가 완료되었습니다.')
  } catch (error) {
    console.error('구매 처리 중 오류가 발생했습니다.', error)
  }
}

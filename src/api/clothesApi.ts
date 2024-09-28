import axiosInstance, { ApiResponse } from './axiosInstance'
// 개별 의류 아이템에 대한 타입
export type ClothesItem = {
  id: number
  imageUrl: string
  name: string
  price: number
  detail: string
  quantity: number
}

// 페이지네이션 정보를 포함한 응답 타입
export type PaginatedResponse<T> = {
  page: number
  size: number
  total: number
  content: T[]
}

// 의류 목록에 대한 페이지네이션된 응답 타입
export type ClothesResponse = PaginatedResponse<ClothesItem>

export const retriveAllClothes = async (
  page: number,
  size: number
): Promise<ClothesResponse> => {
  const response: ApiResponse<ClothesResponse> = await axiosInstance.get(
    '/api/v1/clothes/all',
    {
      params: { page, size },
    }
  )
  return response.data
}

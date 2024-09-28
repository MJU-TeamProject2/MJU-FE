import axiosInstance, { ApiResponse } from './axiosInstance'

// 개별 의류 아이템에 대한 타입
export type ClothesItem = {
  id: number
  category: string
  imageUrl: string
  name: string
  price: number
  genderCategory: string | null
  productNumber: string | null
  discount: number | null
  detailUrl: string
  clothesSizeList: any[]
}

export type PaginatedResponse<T> = {
  page: number
  size: number
  total: number
  content: T[]
}

export type ClothesListResponse = PaginatedResponse<ClothesItem>

export const retriveAllClothes = async (
  page: number,
  size: number
): Promise<ClothesListResponse> => {
  const response: ApiResponse<ClothesListResponse> = await axiosInstance.get(
    '/api/v1/clothes/all',
    {
      params: { page, size },
    }
  )
  return response.data
}

export const retriveClothesDetail = async (
  id: string
): Promise<ClothesItem> => {
  const response: ApiResponse<ClothesItem> = await axiosInstance.get(
    `/api/v1/clothes/${id}`
  )
  return response.data
}

import axiosInstance, { ApiResponse } from './axiosInstance'
// @ts-ignore
import { List } from '@effect-ts/core'
import { Product } from '@/components/types/domain.types'

export type PaginatedResponse<T> = {
  page: number
  size: number
  total: number
  content: T[]
}

export type RegisterCloth = {
  name: string
  category: string
  mainImage: File
  detailImage: File
  objectFile: File
  price: number
  genderCategory: string
  productNumber: string
  quantity: number
  discount: number
  size: string
}

export type ClothesListResponse = PaginatedResponse<Product>

export const retrieveAllClothes = async (
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
export const retrieveClothesByCategory = async (
  page: number,
  size: number,
  activeTab: string
): Promise<ClothesListResponse> => {
  const response: ApiResponse<ClothesListResponse> = await axiosInstance.get(
    `/api/v1/clothes/by/${activeTab}`,
    {
      params: { page, size },
    }
  )
  return response.data
}

export const retrieveClothesDetail = async (id: string): Promise<Product> => {
  const response: ApiResponse<Product> = await axiosInstance.get(
    `/api/v1/clothes/${id}`
  )
  return response.data
}

export const registerCloth = async (
  clothesItem: RegisterCloth
): Promise<RegisterCloth> => {
  const formData = new FormData()
  Object.entries(clothesItem).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value, value.name)
    } else if (typeof value === 'string') {
      formData.append(key, value)
    } else {
      formData.append(key, value.toString())
    }
  })
  const response: ApiResponse<RegisterCloth> = await axiosInstance.post(
    '/api/v1/clothes/product',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        accept: '*/*',
      },
    }
  )
  return response.data
}

export const modifyCloth = async (
  changedList: List,
  clothID: string | undefined
): Promise<RegisterCloth> => {
  const response: ApiResponse<RegisterCloth> = await axiosInstance.patch(
    `/api/v1/clothes/${clothID}`,
    changedList,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        accept: '*/*',
      },
    }
  )
  return response.data
}

export const deleteCloth = async (
  clothID: string | undefined
): Promise<string> => {
  const response: ApiResponse<string> = await axiosInstance.delete(
    `/api/v1/clothes/${clothID}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return response.data
}

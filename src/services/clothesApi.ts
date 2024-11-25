import axiosInstance, { ApiResponse } from './axiosInstance'
// @ts-ignore
import { List } from '@effect-ts/core'

export type ClothesCategory = 'SHOES' | 'TOP' | 'BOTTOM' | 'OUTER' | 'ACCESSORY'
export type GenderCategory = 'MALE' | 'FEMALE' | 'UNISEX'
export type ClothesSize = 'XS' | 'S' | 'M' | 'L' | 'XL'

export interface ClothesSizeQuantity {
  size: ClothesSize
  quantity: number
}

export interface ClothesItem {
  id: string
  category: ClothesCategory
  imageUrl: string
  name: string
  price: number
  genderCategory: GenderCategory
  productNumber: string
  discount: number
  detailUrl: string
  clothesSizeList: ClothesSizeQuantity[]
  objectUrl: string
  objectFemaleUrl: string
  mtlUrl: string
}

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

export type ClothesListResponse = PaginatedResponse<ClothesItem>

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

export const retrieveClothesDetail = async (
  id: string
): Promise<ClothesItem> => {
  const response: ApiResponse<ClothesItem> = await axiosInstance.get(
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

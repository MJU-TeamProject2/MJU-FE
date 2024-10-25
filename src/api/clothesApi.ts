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
  objectUrl: string
  mtlUrl: string
  clothesSizeList: any[]
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
  console.log(response.data)
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
  clothesItem: RegisterCloth,
  clothID: string | undefined
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
  const response: ApiResponse<RegisterCloth> = await axiosInstance.patch(
    `/api/v1/clothes/${clothID}`,
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

export const deleteCloth = async (
  clothID: string | undefined
): Promise<string> => {
  console.log(clothID)
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

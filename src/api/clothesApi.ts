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

export type RegisterResponse = {
  success: boolean
  data: Object
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

export const retrieveClothesDetail = async (
  id: string
): Promise<ClothesItem> => {
  const response: ApiResponse<ClothesItem> = await axiosInstance.get(
    `/api/v1/clothes/${id}`
  )
  return response.data
}

export const registerCloth = async (
    clothesItem: ClothesItem
): Promise<RegisterResponse> => {
  const data = new FormData();
  Object.entries(clothesItem).forEach(([key, value]) => {
    if (value instanceof File) {
      data.append(key, value, value.name);
    } else {
      data.append(key, value.toString());
    }
  });

  const response: ApiResponse<RegisterResponse> = await axiosInstance.post(
      '/api/v1/clothes/product',
      data,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
          'Content-Type': 'multipart/form-data',
        }
      }
  );
  return response.data;
};


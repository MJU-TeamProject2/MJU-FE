import axiosInstance, { ApiResponse } from './axiosInstance'
import Login from "@/page/user/Login.tsx";

export const registerUser = async (
  userData: User
): Promise<User & { id: string }> => {
  const response: ApiResponse<User & { id: string }> = await axiosInstance.post(
    '/api/v1/customer/register',
    userData
  )
  return response.data
}

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response: ApiResponse<LoginResponse> = await axiosInstance.post(
    '/api/v1/customer/login',
    {
      email,
      password,
    }
  )

  if (response.success) {
    const { accessToken, refreshToken } = response.data
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
  }

  return response.data
}

// 회원 정보를 불러오는 함수
export const inquiryUser = async (
  email:string,
  password: string
): Promise<LoginResponse> => {
  const response: ApiResponse<LoginResponse> = await axiosInstance.post(
      '/api/v1/customer/',
      {
        
      }
  )
  if( response.success ){

  }
  return response.data
}

export type User = {
  name: string
  age: number
  gender: string
  email: string
  password: string
  phoneNumber: string
}

export type LoginResponse = {
  customerId: number
  accessToken: string
  refreshToken: string
}

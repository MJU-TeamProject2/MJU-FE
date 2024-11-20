import axiosInstance, { ApiResponse } from './axiosInstance'
import { AxiosError } from 'axios'

export const registerUser = async (
  userData: User
): Promise<User & { id: string }> => {
  const response: ApiResponse<User & { id: string }> = await axiosInstance.post(
    '/api/v1/customer/register',
    userData
  )
  console.log(response.success)
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
export const logout = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}
export const loginAdmin = async (
  code: string,
  password: string
): Promise<AdminLoginResponse> => {
  try {
    const response: ApiResponse<AdminLoginResponse> = await axiosInstance.post(
      '/api/v1/admin/login',
      {
        code,
        password,
      }
    )

    if (response.success) {
      const { accessToken, refreshToken } = response.data
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    }

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || '로그인에 실패했습니다.')
    }
    throw new Error('로그인 중 오류가 발생했습니다.')
  }
}

// 회원 정보를 불러오는 함수

export const inquiryUser = async (): Promise<User> => {
  const token = localStorage.getItem('accessToken')
  if (!token) console.log('Invalid Access')

  const response: ApiResponse<User> = await axiosInstance.get(
    '/api/v1/customer/profile',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}

export const modifyUserInfo = async (
  name: string,
  nickName: string,
  age: number,
  email: string,
  phoneNumber: string,
  height: number,
  weight: number,
  bodyType: string
): Promise<ModifyUserResponse> => {
  const response: ApiResponse<ModifyUserResponse> = await axiosInstance.patch(
    '/api/v1/customer/profile',
    {
      name,
      nickName,
      age,
      email,
      phoneNumber,
      height,
      weight,
      bodyType,
    }
  )
  return response.data
}

export type User = {
  email: string
  name: string
  nickName: string
  age: number
  gender: string
  phoneNumber: string
  height: number
  weight: number
  bodyType: string
  bodyObjUrl: string
}

export type ModifyUserResponse = {
  name: string
  nickName: string
  age: number
  email: string
  phoneNumber: string
  height: number
  weight: number
  bodyType: string
}

export type AdminLoginResponse = {
  accessToken: string
  refreshToken: string
}

export type LoginResponse = {
  customerId: string
  accessToken: string
  refreshToken: string
}

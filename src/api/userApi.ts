import axiosInstance, { ApiResponse } from './axiosInstance'

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

export const loginAdmin = async (
  code: string,
  password: string
): Promise<AdminLoginResponse> => {
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
  phoneNumber: string
): Promise<ModifyUserResponse> => {
  const response: ApiResponse<ModifyUserResponse> = await axiosInstance.patch(
    '/api/v1/customer/profile',
    {
      name,
      nickName,
      age,
      email,
      phoneNumber,
    }
  )
  return response.data
}

export type User = {
  name: string
  age: number
  gender: string
  email: string
  nickName: string
  password: string
  phoneNumber: string
}

export type ModifyUserResponse = {
  name: string
  nickName: string
  gender: string
  age: number
  password: string
  phoneNumber: string
  email: string
}

export type AdminLoginResponse = {
  accessToken: string
  refreshToken: string
}

export type LoginResponse = {
  customerId: number
  accessToken: string
  refreshToken: string
}

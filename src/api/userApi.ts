import axiosInstance, { ApiResponse } from './axiosInstance'
import axios from 'axios'

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

export const registerUser = async (
  userData: User
): Promise<(User & { id: string }) | Error> => {
  try {
    const response = await axiosInstance.post(
      '/api/customer/register',
      userData
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return new Error(
        error.response.data.message || '회원가입 요청에 실패했습니다.'
      )
    }
    return new Error('알 수 없는 에러가 발생했습니다.') // 기타 에러 처리
  }
}
export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse | Error> => {
  try {
    const response: ApiResponse<LoginResponse> = await axiosInstance.post(
      '/api/customer/login',
      {
        email,
        password,
      }
    )
    console.log('accessToken')
    console.log(response)
    if (response.success) {
      const { accessToken, refreshToken } = response.data
      console.log(accessToken)
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    }

    return response.data
  } catch (error) {
    return new Error(String(error))
  }
}

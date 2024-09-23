import axiosInstance from './axiosInstance'
import axios from 'axios'

export type User = {
  name: string
  age: number
  gender: string
  email: string
  password: string
  phoneNumber: string
}

export type LoginInfo = {
  id: string
  email: string
  // 다른 필요한 필드 추가
}

export const registerUser = async (
  userData: User // Omit<User, 'id'> 대신 User로 수정
): Promise<(User & { id: string }) | Error> => {
  // 서버에서 반환할 때 id를 포함해야 하므로 수정
  try {
    const response = await axiosInstance.post(
      '/api/customer/register',
      userData
    )
    return response.data // 성공 시 사용자 데이터 반환 (서버에서 id 포함)
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return new Error(
        error.response.data.message || '회원가입 요청에 실패했습니다.'
      ) // 서버 에러 메시지 반환
    }
    return new Error('알 수 없는 에러가 발생했습니다.') // 기타 에러 처리
  }
}
// 로그인 API 요청 함수
export const loginUser = async (
  email: string,
  password: string
): Promise<LoginInfo | Error> => {
  try {
    const response = await axiosInstance.post('/api/customer/login', {
      email,
      password,
    })
    return response.data // 성공 시 로그인 정보 반환
  } catch (error) {
    return new Error(String(error)) // 실패 시 에러 반환
  }
}

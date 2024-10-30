import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

export type ApiResponse<T> = {
  success: boolean
  data: T
}

// 백엔드 에러 응답 구조에 맞게 수정
export type ErrorResponse = {
  success: boolean
  data: {
    code: string
    message: string
  }
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError<ErrorResponse>) => {
    // 백엔드에서 보낸 에러 응답 구조에 맞게 처리
    if (error.response?.data) {
      return Promise.reject(new Error(error.response.data.data.message))
    }
    return Promise.reject(new Error('에러가 발생했습니다.'))
  }
)

export default axiosInstance

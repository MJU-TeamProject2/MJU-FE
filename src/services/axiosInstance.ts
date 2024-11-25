import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

export type ApiResponse<T> = {
  success: boolean
  data: T
}

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
    if (error.response?.data) {
      return Promise.reject(new Error(error.response.data.data.message))
    }
    return Promise.reject(new Error('에러가 발생했습니다.'))
  }
)

export default axiosInstance

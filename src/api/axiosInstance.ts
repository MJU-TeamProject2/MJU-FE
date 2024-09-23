import axios from 'axios'

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // 기본 API URL
  timeout: 10000, // 타임아웃 설정 (10초)
  headers: {
    'Content-Type': 'application/json',
    // 필요한 경우 추가 헤더 설정
  },
})

// 요청 인터셉터 (선택 사항)
axiosInstance.interceptors.request.use(
  (config) => {
    // 요청이 보내지기 전에 수행할 작업 (예: 토큰 추가)
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터 (선택 사항)
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data // 응답 데이터만 반환
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance

import axios, { AxiosRequestConfig } from 'axios'

const BASE_URL = 'http://localhost:3333/'
const API_TIMEOUT = 50000

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      // getToken 추후 추가
    },
    withCredentials: true,
    ...config,
  })

  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // errror 상세히 처리
      /**
       * - 토큰 만료,
       *  : window.location.href = '/login' 으로 처리 고민
       */
      return Promise.reject(error)
    }
  )
  return axiosInstance
}

export const httpClient = createClient()

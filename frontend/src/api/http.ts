import axios, {
  Axios,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'

import { getToken } from '@/store/auth'

const BASE_URL: string =
  import.meta.env.VITE_BE_BASE_URL || 'http://localhost:3333'
const API_TIMEOUT: number = 50000

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken('accessToken') ? getToken('accessToken') : '',
    },
    withCredentials: true,
    ...config,
  })

  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        alert('로그인에 실패하였습니다. 다시 로그인해 주세요')
        window.location.href = '/login'
        return
      }

      return Promise.reject(error)
    }
  )
  return axiosInstance
}
export const httpClient = createClient()

type TMethods = 'get' | 'post' | 'put' | 'delete'

interface TRequestHandlerArgs<T = void> {
  method: TMethods
  url: string
  data?: T
  config?: AxiosRequestConfig
}

/**
 *
 * T : response Data Type
 * U : Request Data Type
 * @returns
 */
export const axiosRequestHandler = async <T, U = void>({
  method,
  url,
  data,
  config,
}: TRequestHandlerArgs<U>): Promise<AxiosResponse<T>> => {
  let response: AxiosResponse<T>

  switch (method) {
    case 'get': {
      response = await httpClient.get<T>(url, config)
      break
    }
    case 'post': {
      response = await httpClient.post<T>(url, data, config)
      break
    }
    case 'delete': {
      response = await httpClient.delete<T>(url, config)
      break
    }
    case 'put': {
      response = await httpClient.put<T>(url, data, config)
      break
    }
    default:
      throw new Error(`Unsupported method: ${method}`)
  }
  // console.log(response.config.headers)
  return response
  /**
   * response reuturn
   * data : response data
   * status,
   * headers
   * statusText
   * config
   */
}

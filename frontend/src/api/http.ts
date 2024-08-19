import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

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
      Authorization: getToken() ? getToken() : '',
    },
    withCredentials: true,
    ...config,
  })

  axiosInstance.interceptors.response.use(
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

type TMethods = 'get' | 'post' | 'put' | 'delete'

interface TRequestHandlerArgs<T> {
  method: TMethods
  url: string
  data?: T
  config?: AxiosRequestConfig
}

/**
 *
 * T : request body data type,
 * U : response data type
 * @returns
 */
export const axiosRequestHandler = async <T, U>({
  method,
  url,
  data,
  config,
}: TRequestHandlerArgs<T>): Promise<AxiosResponse<U>> => {
  let response: AxiosResponse<U>

  switch (method) {
    case 'get': {
      response = await httpClient.get<U>(url, config)
      break
    }
    case 'post': {
      response = await httpClient.post<U>(url, data, config)
      break
    }
    case 'delete': {
      response = await httpClient.delete<U>(url, config)
      break
    }
    case 'put': {
      response = await httpClient.put<U>(url, data, config)
      break
    }
    default:
      throw new Error(`Unsupported method: ${method}`)
  }
  console.log(response.config.headers)
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

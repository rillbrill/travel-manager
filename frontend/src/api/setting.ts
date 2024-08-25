import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { jwtDecode } from 'jwt-decode'
import snakecaseKeys from 'snakecase-keys'

import { routes } from '@/routes'
import { getToken, removeToken, setToken } from '@/store/auth'

const BASE_URL: string =
  import.meta.env.VITE_BE_BASE_URL || 'http://localhost:3333'
const API_TIMEOUT: number = 50000

/**
 * token 만료 확인 함수
 * @param token
 * @returns
 */
function isTokenExpired(token: string): boolean {
  try {
    const decodeToken = jwtDecode(token)
    const expireDate = decodeToken.exp
    return expireDate ? Date.now() >= expireDate * 1000 : true
  } catch (e) {
    console.error(e)
    return true
  }
}

// Request 관련
let isRefreshing = false
let failedQueue: Array<(token: string) => void> = []

export const createClient = (config?: AxiosRequestConfig): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken('accessToken') ? getToken('accessToken') : '',
    },

    ...config,
  })

  // Request Interceptor
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = getToken('accessToken')
      if (!token) {
        return config
      }

      if (token && isTokenExpired(token)) {
        console.log('토큰 만료')
        if (isRefreshing) {
          return new Promise((resolve) => {
            failedQueue.push((newToken: string) => {
              config.headers!['Authorization'] = `Bearer ${newToken}`
              resolve(axiosInstance(config))
            })
          })
        }

        isRefreshing = true

        const refreshToken = getToken('refreshToken')

        try {
          const response = await axios.post(`${BASE_URL}/api/refresh`, {
            refreshToken,
          })
          const { accessToken } = response.data

          setToken('accessToken', accessToken)
          isRefreshing = false

          failedQueue.forEach((callback) => callback(accessToken))
          failedQueue = []

          config.headers!['Authorization'] = accessToken
          return axiosInstance(config)
        } catch (refreshError) {
          isRefreshing = false
          removeToken('refreshToken')
          removeToken('accessToken')
          window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      }

      if (token) {
        config.headers!['Authorization'] = token
      }

      return config
    },
    (error: AxiosError) => Promise.reject(error)
  )

  // request interceptor
  axiosInstance.interceptors.request.use((request) => {
    if (request.data) {
      return { ...request, data: snakecaseKeys(request.data, { deep: true }) }
    }
    return request
  })

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return { ...response, data: camelcaseKeys(response.data, { deep: true }) }
    },
    (error: AxiosError) => {
      //401 => accessToken 만료
      //403 => refreshToken 만료
      if (error.response?.status === 401) {
        alert('로그인에 실패하였습니다. 다시 로그인해 주세요')
        window.location.href = routes.login
        return
      }

      return Promise.reject(error)
    }
  )

  return axiosInstance
}

export const httpClient = createClient()

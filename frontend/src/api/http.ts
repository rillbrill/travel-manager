import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { httpClient } from './setting'

type TMethods = 'get' | 'post' | 'put' | 'delete'

interface TRequestHandlerArgs<T = void> {
  method: TMethods
  url: string
  data?: T
  config?: AxiosRequestConfig
}

/**
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

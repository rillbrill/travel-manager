import { httpClient } from './http'

export const getKakaoTokenFromServer = async () => {
  const response = await httpClient.get('/api/auth/kakao')
  return response.data
}

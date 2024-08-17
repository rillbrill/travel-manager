import { IKakaoUserSuccess } from '@/model/kakao.model'

import { httpClient } from './http'

export const getKakaoTokenFromServer = async ({ code }: { code: string }) => {
  const response = await httpClient.get<IKakaoUserSuccess>(
    `/api/auth/kakao?code=${code}`
  )
  return response.data
}

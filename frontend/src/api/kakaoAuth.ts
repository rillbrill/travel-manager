import { IKakaoUserSuccess } from '@/types/kakao'

import { axiosRequestHandler } from './http'

export const getKakaoToken = async ({ code }: { code: string }) => {
  // const response = await httpClient.get<IKakaoUserSuccess>(
  //   `/api/auth/kakao?code=${code}`
  // )
  // return response.data

  return axiosRequestHandler<IKakaoUserSuccess>({
    method: 'get',
    url: `/api/auth/kakao?code=${code}`,
  })
}

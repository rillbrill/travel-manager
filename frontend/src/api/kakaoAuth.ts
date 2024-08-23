import { IKakaoUserSuccess } from '@/types/kakao'

import { axiosRequestHandler } from './http'

interface IGetKakaoTokenBody {
  kakaoAccessToken: string
}

export const getKakaoToken = async ({ code }: { code: string }) => {
  // const response = await httpClient.get<IKakaoUserSuccess>(
  //   `/api/auth/kakao?code=${code}`
  // )
  // return response.data

  return axiosRequestHandler<IKakaoUserSuccess, IGetKakaoTokenBody>({
    method: 'post',
    url: `/api/auth/kakao`,
    data: { kakaoAccessToken: code },
  })
}

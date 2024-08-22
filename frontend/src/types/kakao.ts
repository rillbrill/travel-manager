interface IKakaoUserSuccess {
  accessToken: string
  message: string
  refreshToken: string
  user: {
    email: string | null
    id: number
    nickname: string
  }
}

interface IKakaoFail {
  message: string
  error: string
}

export type { IKakaoFail, IKakaoUserSuccess }

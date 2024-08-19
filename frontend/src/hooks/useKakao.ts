import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getKakaoUserFromServer } from '@/api/kakaoAuth'
import { setToken, useAuthStore } from '@/store/auth'
import { IKakaoFail, IKakaoUserSuccess } from '@/types/kakao'

interface Props {
  code: string
}

export const useKakao = ({ code }: Props) => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState<IKakaoUserSuccess | null>(null)
  const { authLogin } = useAuthStore()
  useEffect(() => {
    getKakaoUserFromServer({ code })
      .then((response) => {
        if (response?.data?.accessToken && response?.data?.refreshToken) {
          authLogin(response.data.accessToken, 'accessToken')
          setToken(response.data.refreshToken, 'refreshToken')
        }

        navigate('/')
      })
      .catch((error) => {
        console.error(error)
        navigate('/login')
      })
  }, [code])

  return { userInfo }
}

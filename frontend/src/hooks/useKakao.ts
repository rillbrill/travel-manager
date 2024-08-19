import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getKakaoUserFromServer } from '@/api/kakaoAuth'
import { setToken } from '@/store/auth'
import { IKakaoFail, IKakaoUserSuccess } from '@/types/kakao'

interface Props {
  code: string
}

export const useKakao = ({ code }: Props) => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState<IKakaoUserSuccess | null>(null)

  useEffect(() => {
    getKakaoUserFromServer({ code })
      .then((response) => {
        if (response?.data?.accessToken && response?.data?.refreshToken) {
          setToken(response.data.accessToken, 'accessToken')
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

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getKakaoUserFromServer } from '@/api/kakaoAuth'
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
          localStorage.setItem('accessToken', response.data.accessToken)
          localStorage.setItem('refreshToken', response.data.refreshToken)
        }
        // console.log('카카오유저', userInfo)

        navigate('/')
      })
      .catch((error) => {
        console.error(error)
        navigate('/login')
      })
  }, [code])

  return { userInfo }
}

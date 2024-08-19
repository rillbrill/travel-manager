import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getKakaoTokenFromServer } from '@/api/kakaoAuth.api'
import { IKakaoUserSuccess } from '@/model/kakao.model'

interface Props {
  code: string
}

export const useKakao = ({ code }: Props) => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState<IKakaoUserSuccess | null>(null)
  useEffect(() => {
    getKakaoTokenFromServer({ code })
      .then((response) => {
        setUserInfo(response)
        console.log('카카오 유저:', response)
        navigate('/')
      })
      .catch((error) => {
        navigate('/login')
      })
  }, [code])

  return { userInfo }
}

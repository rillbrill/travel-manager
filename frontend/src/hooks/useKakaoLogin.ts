import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getFetchKakaoLogin } from '@/api/kakaoAuth'
import { routes } from '@/routes'
import { setToken, useAuthStore } from '@/store/auth'
import { IKakaoFail, IKakaoUserSuccess } from '@/types/kakao'

interface Props {
  code: string
}

export const useKakaoLogin = ({ code }: Props) => {
  const navigate = useNavigate()

  const { authLogin } = useAuthStore()
  useEffect(() => {
    getFetchKakaoLogin({ code })
      .then((response) => {
        if (response?.data?.accessToken && response?.data?.refreshToken) {
          authLogin(response.data.accessToken, 'accessToken')
          setToken(response.data.refreshToken, 'refreshToken')
          navigate(routes.plans)
        }
      })
      .catch((error) => {
        console.error(error)
        navigate(routes.login)
      })
  }, [code])
}

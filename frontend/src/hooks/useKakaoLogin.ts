import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getKakaoToken } from '@/api/kakaoAuth'
import { routes } from '@/routes'
import { setToken, useAuthStore } from '@/store/auth'

interface Props {
  code: string
}

export const useKakaoLogin = ({ code }: Props) => {
  const navigate = useNavigate()

  const { authLogin } = useAuthStore()
  useEffect(() => {
    getKakaoToken({ code })
      .then((response) => {
        console.log(response)
        if (response?.data?.accessToken && response?.data?.refreshToken) {
          authLogin('accessToken', response.data.accessToken)
          setToken('refreshToken', response.data.refreshToken)
          navigate(routes.plans)
        }
      })
      .catch((error) => {
        console.error(error)
        navigate(routes.login)
      })
  }, [code])
}

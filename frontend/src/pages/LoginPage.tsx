import { useEffect } from 'react'

import { axiosRequestHandler } from '@/api/http'

import kakaoLoginImage from '../assets/images/kakao_login_medium_narrow.png'

function KakaoSocialButton() {
  const restApiKey = import.meta.env.VITE_KAKAO_CLIENT_ID
  const redirectUri = import.meta.env.VITE_KAKAO_FE_REDIRECT_URI
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUri}&response_type=code`

  function clickHandler() {
    window.location.href = kakaoUrl
  }

  return (
    <button onClick={clickHandler}>
      <img src={kakaoLoginImage} alt="카카오 로그인 버튼" />
    </button>
  )
}

function LoginPage() {
  return (
    <section className="flex h-screen flex-1 flex-col items-center justify-center">
      <div className="mb-3">
        <h1 className="font-logo text-4xl text-primary-default">
          TravelManager
        </h1>
      </div>
      <div>
        <KakaoSocialButton />
      </div>
    </section>
  )
}

export default LoginPage

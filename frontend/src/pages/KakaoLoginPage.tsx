import React from 'react'
import { useNavigate } from 'react-router-dom'

function KakaoLoginPage() {
  const navigate = useNavigate()
  const code = new URL(window.location.href).searchParams.get('code')

  return <div>KakaoLoginPage</div>
}

export default KakaoLoginPage

import LoadingSpinner from '@/components/common/LoadingSpinner'
import { useKakao } from '@/hooks/useKakao'
import { IKakaoUserSuccess } from '@/model/kakao.model'
// import {  IKakaoFail, IKakaoUserSuccess } from '@/model/kakao.model'

function KakaoLoginPage() {
  const code = new URL(window.location.href).searchParams.get('code')!
  const { userInfo } = useKakao({ code })

  // const [kakaoUser, setKakaoUser] = useState<IKakaoUserSuccess| IKakaoFail | null>(null)

  return (
    <div className="m-auto flex h-full w-max flex-col items-center">
      <LoadingSpinner />
    </div>
  )
}

export default KakaoLoginPage

function KakaoSocoalButton() {
  return <button>카카오 로그인</button>
}

function LoginPage() {
  return (
    <section className="flex h-screen flex-1 flex-col items-center justify-center">
      <div className="mb-3">
        <h1 className="font-logo text-3xl">TravelManager</h1>
      </div>
      <div>
        <KakaoSocoalButton />
      </div>
    </section>
  )
}

export default LoginPage

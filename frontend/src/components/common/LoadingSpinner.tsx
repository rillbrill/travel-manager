import LoadingSpinnerGif from '../../assets/images/LoadingSpinner.gif'

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h3>로그인 중입니다...</h3>
      <img src={LoadingSpinnerGif} alt="로딩 이미지" />
    </div>
  )
}

export default LoadingSpinner

import logo from '@/assets/logo.svg'

function LogoSection() {
  return (
    <div className="hidden lg:container lg:flex lg:items-center lg:justify-center lg:bg-primary-50">
      <div className="flex items-center gap-x-4">
        <img src={logo} alt="logo" />
        <h1 className="font-logo text-4xl text-primary-default">
          Travel Manager
        </h1>
      </div>
    </div>
  )
}

export default LogoSection

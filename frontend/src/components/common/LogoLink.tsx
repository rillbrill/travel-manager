import { Link } from 'react-router-dom'

import { routes } from '@/routes'

function LogoLink() {
  return (
    <Link to={routes.plans}>
      <h1 className="font-logo text-2xl text-primary-default">
        Travel Manager
      </h1>
    </Link>
  )
}

export default LogoLink

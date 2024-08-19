import { FiPlusSquare } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { routes } from '@/routes'

import LogoLink from '../common/LogoLink'

function Header() {
  return (
    <header className="mb-4 flex items-center justify-between p-4 shadow-bottom">
      <LogoLink />
      <Link to={routes.addPlan}>
        <FiPlusSquare size="24px" className="text-gray-400" />
      </Link>
    </header>
  )
}

export default Header

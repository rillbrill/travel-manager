import { FiPlusSquare } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'

import { routes } from '@/routes'

import { LogoLink } from '../common'

function Header() {
  const { pathname } = useLocation()
  const showAddPlanButton = pathname !== routes.addPlan

  return (
    <header className="mb-4 flex items-center justify-between p-4 shadow-bottom">
      <LogoLink />
      {showAddPlanButton && (
        <Link to={routes.addPlan}>
          <FiPlusSquare size="24px" className="text-gray-400" />
        </Link>
      )}
    </header>
  )
}

export default Header

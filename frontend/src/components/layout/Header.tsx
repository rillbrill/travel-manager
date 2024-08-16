import { useMemo } from 'react'
import { FiPlusSquare } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'

import { routes } from '@/routes'

import LogoLink from '../common/LogoLink'

function Header() {
  const { pathname } = useLocation()
  const isAddPlanPage = useMemo(() => pathname === routes.addPlan, [pathname])

  return (
    <header className="mb-4 flex items-center justify-between p-4 shadow-bottom">
      <LogoLink />
      {!isAddPlanPage && (
        <Link to={routes.addPlan}>
          <FiPlusSquare size="24px" color="var(--gray-400)" />
        </Link>
      )}
    </header>
  )
}

export default Header

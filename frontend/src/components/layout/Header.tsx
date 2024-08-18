import { useMemo } from 'react'
import { FiPlusSquare } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'

import { routes } from '@/routes'
import { AddPlanStepEnum } from '@/types'

import LogoLink from '../common/LogoLink'

function Header() {
  const { pathname } = useLocation()
  const showAddPlanButton = useMemo(
    () => pathname !== routes.addPlan,
    [pathname]
  )

  return (
    <header className="mb-4 flex items-center justify-between p-4 shadow-bottom">
      <LogoLink />
      {showAddPlanButton && (
        <Link to={`${routes.addPlan}/${AddPlanStepEnum.SetInfo}`}>
          <FiPlusSquare size="24px" className="text-gray-400" />
        </Link>
      )}
    </header>
  )
}

export default Header

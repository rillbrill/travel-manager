import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { routes } from '@/routes'

import LogoSection from '../common/LogoSection'
import Header from './Header'

type Props = {
  children: React.ReactNode
}

function MainLayout({ children }: Props) {
  const { pathname } = useLocation()
  const isLoginPage = useMemo(() => pathname === routes.login, [pathname])

  return (
    <div className="layout">
      <LogoSection />
      <div className="container flex flex-col bg-gray-50 shadow-container">
        {!isLoginPage && <Header />}
        {children}
      </div>
    </div>
  )
}

export default MainLayout

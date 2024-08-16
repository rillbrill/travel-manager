import React from 'react'

import LogoSection from '../common/LogoSection'

type Props = {
  children: React.ReactNode
}

function Layout({ children }: Props) {
  return (
    <div className="layout">
      <LogoSection />
      <div className="container shadow-container">{children}</div>
    </div>
  )
}

export default Layout

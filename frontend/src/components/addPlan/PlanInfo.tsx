import React from 'react'

type PlanInfoProps = {
  icon: React.ReactNode
  title: string
  content: string
}

export const PlanInfo: React.FC<PlanInfoProps> = ({ icon, title, content }) => {
  return (
    <div className="mb-1 flex items-center justify-between space-x-2">
      <div className="flex space-x-2">
        {icon}
        <p className="font-semibold">{title}</p>
      </div>
      <p>{content}</p>
    </div>
  )
}

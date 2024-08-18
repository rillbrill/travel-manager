import React from 'react'
import { useParams } from 'react-router-dom'

import Stepper from '../addPlan/Stepper'

type Props = {
  children: React.ReactNode
}

function AddPlanPageLayout({ children }: Props) {
  const { stepId } = useParams()

  return (
    <div className="flex flex-1 flex-col items-center gap-y-8 px-4 py-6">
      <Stepper currentStep={Number(stepId)} />

      {children}
    </div>
  )
}

export default AddPlanPageLayout

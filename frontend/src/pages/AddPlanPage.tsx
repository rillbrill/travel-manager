import { useState } from 'react'

import SetDateForm from '@/components/addPlan/SetDateForm'
import SetInfoForm from '@/components/addPlan/SetInfoForm'
import SetPlaceForm from '@/components/addPlan/SetPlaceForm'
import Stepper from '@/components/addPlan/Stepper'
import { AddPlanStepEnum } from '@/types'

function AddPlanPage() {
  const [currentStep, setCurrentStep] = useState<number>(
    AddPlanStepEnum.SetInfo
  )

  const moveStep = (step: number) => {
    setCurrentStep(step)
  }

  return (
    <div className="flex flex-1 flex-col items-center gap-y-8 px-4 py-6">
      <Stepper currentStep={currentStep} />

      {currentStep === AddPlanStepEnum.SetInfo && (
        <SetInfoForm currentStep={currentStep} moveStep={moveStep} />
      )}
      {currentStep === AddPlanStepEnum.SetDate && (
        <SetDateForm currentStep={currentStep} moveStep={moveStep} />
      )}
      {currentStep === AddPlanStepEnum.SetPlace && (
        <SetPlaceForm currentStep={currentStep} moveStep={moveStep} />
      )}
    </div>
  )
}

export default AddPlanPage

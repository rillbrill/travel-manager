import { useState } from 'react'

import SetDateForm from '@/components/addPlan/SetDateForm'
import SetInfoForm from '@/components/addPlan/SetInfoForm'
import SetPlaceForm from '@/components/addPlan/SetPlaceForm'
import Stepper from '@/components/addPlan/Stepper/Stepper'
import { AddPlanStepEnum } from '@/types'

function AddPlanPage() {
  const [step, setStep] = useState<AddPlanStepEnum>(AddPlanStepEnum.SetDate)

  return (
    <div className="flex flex-col items-center gap-y-8 px-4 py-6">
      <Stepper currentStep={step} />

      {step === AddPlanStepEnum.SetInfo && <SetInfoForm />}
      {step === AddPlanStepEnum.SetDate && <SetDateForm />}
      {step === AddPlanStepEnum.SetPlace && <SetPlaceForm />}
    </div>
  )
}

export default AddPlanPage

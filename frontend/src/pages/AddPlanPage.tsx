import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import SetDateForm from '@/components/addPlan/SetDateForm'
import SetInfoForm from '@/components/addPlan/SetInfoForm'
import SetPlaceForm from '@/components/addPlan/SetPlaceForm'
import { AddPlanStepEnum } from '@/types'

function AddPlanPage() {
  const { stepId } = useParams()
  const currentStep = useMemo(
    () => (Number(stepId) || AddPlanStepEnum.SetInfo) as AddPlanStepEnum,
    [stepId]
  )

  return (
    <>
      {currentStep === AddPlanStepEnum.SetInfo && <SetInfoForm />}
      {currentStep === AddPlanStepEnum.SetDate && <SetDateForm />}
      {currentStep === AddPlanStepEnum.SetPlace && <SetPlaceForm />}
    </>
  )
}

export default AddPlanPage

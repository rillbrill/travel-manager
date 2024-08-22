import { useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import MoveStepButtons from '@/components/addPlan/MoveStepButtons'
import SetDateForm from '@/components/addPlan/SetDateForm'
import SetInfoForm from '@/components/addPlan/SetInfoForm'
import SetPlaceForm from '@/components/addPlan/SetPlaceForm'
import Stepper from '@/components/addPlan/Stepper'
import { usePlanStore } from '@/store/plan'
import { AddPlanStepEnum } from '@/types'
import { Plan } from '@/types/plan'

function AddPlanPage() {
  const [currentStep, setCurrentStep] = useState<number>(
    AddPlanStepEnum.SetInfo
  )
  const { plan } = usePlanStore()
  const methods = useForm<Partial<Plan>>({
    defaultValues: plan,
    mode: 'onChange',
  })
  const {
    formState: { errors, isDirty },
  } = methods

  const isValid = useMemo(() => {
    switch (currentStep) {
      case AddPlanStepEnum.SetInfo:
        return !errors.name && !errors.headCount
      case AddPlanStepEnum.SetDate:
        return !!plan.startDate && !!plan.endDate
      case AddPlanStepEnum.SetPlace:
        return !errors.places
    }
  }, [currentStep, plan, errors])
  const moveStep = (step: number) => {
    setCurrentStep(step)
  }
  console.log(errors, isValid)

  return (
    <div className="flex flex-1 flex-col items-center gap-y-4 p-4">
      <Stepper currentStep={currentStep} />

      <FormProvider {...methods}>
        <form className="flex w-full flex-1 flex-col justify-between">
          {currentStep === AddPlanStepEnum.SetInfo && <SetInfoForm />}
          {currentStep === AddPlanStepEnum.SetDate && <SetDateForm />}
          {currentStep === AddPlanStepEnum.SetPlace && <SetPlaceForm />}
        </form>
      </FormProvider>

      <MoveStepButtons
        stepIndex={currentStep}
        isValid={isValid && isDirty}
        moveStep={moveStep}
      />
    </div>
  )
}

export default AddPlanPage

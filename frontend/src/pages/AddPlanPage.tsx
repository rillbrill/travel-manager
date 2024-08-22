import { useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import CheckPlan from '@/components/addPlan/CheckPlan'
import MoveStepButtons from '@/components/addPlan/MoveStepButtons'
import SetInfoForm from '@/components/addPlan/SetInfoForm'
import SetPlaceAndDateForm from '@/components/addPlan/SetPlaceAndDateForm'
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
      case AddPlanStepEnum.SetPlaceAndDate:
        return (
          !!plan.startDate &&
          !!plan.endDate &&
          plan.places.length > 0 &&
          plan.places.filter((elem) => !elem.startDate || !elem.endDate)
            .length === 0
        )
      case AddPlanStepEnum.CheckPlan:
        return true
    }
  }, [currentStep, plan, errors])
  const moveStep = (step: number) => {
    setCurrentStep(step)
  }

  return (
    <div className="relative flex flex-1 flex-col items-center gap-y-4 p-4">
      <Stepper currentStep={currentStep} />

      <FormProvider {...methods}>
        <form className="flex w-full flex-1 flex-col">
          {currentStep === AddPlanStepEnum.SetInfo && <SetInfoForm />}
          {currentStep === AddPlanStepEnum.SetPlaceAndDate && (
            <SetPlaceAndDateForm />
          )}
          {currentStep === AddPlanStepEnum.CheckPlan && <CheckPlan />}
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

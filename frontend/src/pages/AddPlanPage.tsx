import { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { plansApi } from '@/api/plans'
import CheckPlan from '@/components/addPlan/CheckPlan'
import MoveStepButtons from '@/components/addPlan/MoveStepButtons'
import SetInfoForm from '@/components/addPlan/SetInfoForm'
import SetPlaceAndDateForm from '@/components/addPlan/SetPlaceAndDateForm'
import Stepper from '@/components/addPlan/Stepper'
import { usePending } from '@/hooks/usePending'
import { routes } from '@/routes'
import { usePlanStore } from '@/store/plan'
import { AddPlanStepEnum, HttpStatusCodeEnum } from '@/types'
import { AddPlanReqDto } from '@/types/plan'

function AddPlanPage() {
  const [currentStep, setCurrentStep] = useState<number>(
    AddPlanStepEnum.SetInfo
  )
  const { plan, resetPlan } = usePlanStore()
  const methods = useForm<Partial<AddPlanReqDto>>({
    mode: 'onChange',
  })
  const navigate = useNavigate()
  const { isPending, toggleIsPending } = usePending()

  const {
    formState: { errors, isDirty },
  } = methods
  const isValid = useMemo(() => {
    switch (currentStep) {
      case AddPlanStepEnum.SetInfo:
        return !errors.planCountry && !errors.headCount
      case AddPlanStepEnum.SetPlaceAndDate:
        return !!plan.startDate && !!plan.endDate && !!plan.planCountry
      case AddPlanStepEnum.CheckPlan:
        return true
    }
  }, [currentStep, plan, errors])
  const moveStep = (step: number) => {
    setCurrentStep(step)
  }
  const handleSubmit = async () => {
    toggleIsPending(true)
    const response = await plansApi.addPlan(plan)
    toggleIsPending(false)

    if (response?.status === HttpStatusCodeEnum.Created) {
      resetPlan()
      navigate(routes.plans)
    } else {
      alert('여행 생성에 실패했습니다.')
    }
  }

  useEffect(() => {
    resetPlan()
  }, [])

  return (
    <div className="flex flex-1 flex-col items-center gap-y-4 p-4">
      <Stepper currentStep={currentStep} />

      <FormProvider {...methods}>
        <form className="flex w-full flex-1 flex-col justify-between">
          {currentStep === AddPlanStepEnum.SetInfo && <SetInfoForm />}
          {currentStep === AddPlanStepEnum.SetPlaceAndDate && (
            <SetPlaceAndDateForm />
          )}
          {currentStep === AddPlanStepEnum.CheckPlan && <CheckPlan />}

          <MoveStepButtons
            stepIndex={currentStep}
            isValid={isValid && isDirty}
            isLoading={isPending}
            moveStep={moveStep}
            handleSubmit={handleSubmit}
          />
        </form>
      </FormProvider>
    </div>
  )
}

export default AddPlanPage

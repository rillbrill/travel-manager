import { StoreNameEnum } from '@/types'
import { AddPlanReqDto, NullableDate } from '@/types/plan'

import { createStoreWithMiddleware } from './createStoreWithMiddleware'

type PlanState = {
  plan: AddPlanReqDto
}

type PlanActions = {
  setPlanName: (value: string) => void
  setPlanCountry: (value: string) => void
  setHeadCount: (value: number) => void
  setDates: (startDate: NullableDate, endDate: NullableDate) => void
  setPlan: (newPlan: Partial<AddPlanReqDto>) => void
  resetPlan: () => void
}

const initialState: AddPlanReqDto = {
  planName: '',
  planCountry: '',
  headCount: 1,
  startDate: null,
  endDate: null,
  planEnd: false,
}

export const usePlanStore = createStoreWithMiddleware<PlanState & PlanActions>(
  (set) => ({
    plan: initialState,
    setPlanName: (value) =>
      set(({ plan }) => {
        plan.planName = value
      }),
    setPlanCountry: (country) =>
      set(({ plan }) => {
        plan.planCountry = country
      }),
    setHeadCount: (value) =>
      set(({ plan }) => {
        plan.headCount = value
      }),
    setDates: (startDate, endDate) =>
      set(({ plan }) => {
        plan.startDate = startDate
        plan.endDate = endDate
      }),
    setPlan: (values) => {
      set(({ plan }) => {
        plan = {
          ...plan,
          ...values,
        }
      })
    },
    resetPlan: () => {
      set((state) => {
        state.plan = initialState
      })
    },
  }),
  StoreNameEnum.Plan
)

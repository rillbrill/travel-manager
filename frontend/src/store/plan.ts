import { StoreNameEnum } from '@/types'
import { Plan } from '@/types/plan'

import { createStoreWithMiddleware } from './createStoreWithMiddleware'

type PlanState = {
  plan: Plan
}

type PlanActions = {
  setName: (value: string) => void
  setHeadCount: (value: number) => void
  setDates: (startDate: Date, endDate: Date | null) => void
  setPlan: (newPlan: Partial<Plan>) => void
}

const initialState = {
  name: '',
  headCount: 1,
  startDate: new Date(),
  endDate: null,
  places: [],
}

export const usePlanStore = createStoreWithMiddleware<PlanState & PlanActions>(
  (set) => ({
    plan: initialState,
    setName: (value) =>
      set(({ plan }) => {
        plan.name = value
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
  }),
  StoreNameEnum.Plan
)

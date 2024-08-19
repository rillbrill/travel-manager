import { create } from 'zustand'

import { Plan } from '@/types/plan'

type PlanState = {
  plan: Plan
  setPlan: (newPlan: Partial<Plan>) => void
}

const initialState = {
  name: '',
  count: 1,
  startDate: new Date(),
  endDate: null,
  places: [],
}

export const usePlanStore = create<PlanState>((set) => ({
  plan: initialState,
  setPlan: (newPlan) =>
    set((prev) => ({
      ...prev,
      plan: {
        ...prev.plan,
        ...newPlan,
      },
    })),
}))

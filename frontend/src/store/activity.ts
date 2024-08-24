import { create } from 'zustand'

import { Activity } from '@/types/plan'

const initialState: Activity = {
  id: '',
  activityName: '',
  detail: '',
  activityLocation: '',
  activityExpenses: 0,
  category: '',
  isActivity: true,
  order: 0,
}

type ActivityStore = {
  activity: Activity
  editingActivityId: string
  setActivity: (activity: Activity) => void
  setEditingActivityId: (id: string) => void
}

export const useActivityStore = create<ActivityStore>((set) => ({
  activity: initialState,
  editingActivityId: '',
  setActivity: (activity) => set({ activity }),
  setEditingActivityId: (id) => set({ editingActivityId: id }),
}))

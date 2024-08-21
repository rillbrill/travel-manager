export type CategoryType = {
  name: string
  color: string
}

export type ScheduleType = {
  category: string
  color: string
  location: string
}

export type ExpenseType = {
  category: string
  color: string
  memo: string
}

// PlanDetailPageUI의 타입
export type Tab = 'schedule' | 'expense'
export type ActiveTabState = {
  [key: string]: {
    schedule: boolean
    expense: boolean
  }
}
export type ShowAddFormState = {
  [key: string]: {
    schedule: boolean
    expense: boolean
  }
}

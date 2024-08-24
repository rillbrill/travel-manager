export enum DaysTabEnum {
  Activity = '일정',
  Expense = '경비',
}

export enum DayCategoryEnum {
  Activity = '활동',
  Accommodation = '숙소',
  Breakfast = '아침',
  Lunch = '점심',
  Dinner = '저녁',
  Cafe = '카페',
  Etc = '기타',
}

export type NullableDate = Date | null

export type Plan = {
  id: string
  planName: string
  planCountry: string
  headCount: number
  startDate: NullableDate
  endDate: NullableDate
  totalExpenses: number
  planEnd: boolean
}

export type Activity = {
  id: string
  activityName: string
  detail: string
  activityLocation: string
  activityExpenses: number | null
  category: string
  isActivity: boolean
  order: number
}

export type Day = {
  id: string
  date: Date
  activities: Activity[]
}

export type DayCategory = {
  name: DayCategoryEnum
  color: string
}

export type Expense = {
  id: string
  category: string
  krw: number
}

export type ExtraExpense = {
  id: string
  category: string
  expenseName: string
  krw: number
}

export type AddPlanReqDto = Omit<Plan, 'id' | 'totalExpenses'>

export type AddPlanResDto = Plan

export type PlansResDto = Plan[]

export type PlanResDto = Plan

export type DaysResDto = Day[]

export type AddActivityReqDto = Omit<Activity, 'id' | 'isActivity' | 'order'>

export type AddActivityResDto = Activity & {
  day: { id: string; plan: { id: string } }
}

export type AddEtcActivityReqDto = AddActivityReqDto

export type AddEtcActivityResDto = AddActivityResDto

export type ActivitiesByDayResDto = Activity[]

export type EditActivityReqDto = AddActivityReqDto

export type EditActivityResDto = Activity

export type OrderActivitiesReqDto = {
  order: number
}

export type OrderActivitiesResDto = {
  success: boolean
}

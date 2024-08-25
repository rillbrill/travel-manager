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
  detail: string | null
  activityLocation: string | null
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

export type Place = {
  cityName: string
  countryName: string
}

export type ActivitiesByPlan = {
  id: string
  date: Date
  activities: Activity[]
}

export type Currency = {
  code: string
  value: number
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

export type SameName = {
  region: string[]
  keyword: string
  selectedRegion: string
}

export type Meta = {
  totalCount: number
  pageableCount: number
  isEnd: boolean
  sameName: SameName
}

export type Document = {
  id: string
  placeName: string
  categoryName: string
  categoryGroupCode: string
  categoryGroupName: string
  phone: string
  addressName: string
  roadAddressName: string
  x: string
  y: string
  placeUrl: string
  distance: string
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

export type ActivitiesByPlanResDto = ActivitiesByPlan[]

export type ActivitiesByDayResDto = Activity[]

export type EditActivityReqDto = AddActivityReqDto

export type EditActivityResDto = Activity

export type PlacesResDto = Place[]

export type CountryCodeResDto = string

export type ConvertCurrencyReqDto = {
  from: string
  to: string
  amount: number
}

export type ConvertCurrencyResDto = {
  original: Currency
  converted: Currency
}

export type LocalSearchKeywordResDto = {
  meta: Meta
  documents: Document[]
}

export type ChangeActivityOrderReqDto = {
  planId: string
  dayId: string
  activityId: string
  order: number
}

export type ChangeActivityOrderResDto = {
  success: boolean
}

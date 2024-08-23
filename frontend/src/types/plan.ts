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

export type Place = {
  id: number
  place: string
  startDate: NullableDate
  endDate: NullableDate
}

export type Plan = {
  name: string
  startDate: NullableDate
  endDate: NullableDate
  headCount: number
  places: Place[]
}

export type Activity = {
  id: string
  planId: string
  dayId: string
  activityName: string
  activityPlaceName: string
  activityDetail: string
  activityExpense: number
}

export type Day = {
  id: string
  planId: string
  date: Date
  country: string
  city: string
  totalExpense: number
  activities: Activity[]
}

export type DayCategory = {
  name: DayCategoryEnum
  color: string
}

export type DaysResDto = Day[]

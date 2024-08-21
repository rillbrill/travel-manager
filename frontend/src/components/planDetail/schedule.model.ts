export type CategoryType = {
  name: string
  color: string
}

export interface ScheduleType {
  category: string
  color: string
  location: string
}

export interface ExpenseType {
  category: string
  color: string
  expense: string
}

export interface DayType {
  planId: string
  dayId: string
  day: number
  date: string
  location: string
  //schedules: ScheduleType[];
  expenses: ExpenseType[]
}

/*
export interface ExpenseDayType {
  planId: string;
  dayId: string;
  day: number;
  date: string;
  expensesDetail: ExpenseType[];
}
  */

export interface DailyPlanDetailProps {
  schedules: ScheduleType[]
  expenses: ExpenseType[]
}

export interface ExpenseListProps {
  expenses: ExpenseType[]
}

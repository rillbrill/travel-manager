import { Day, DayCategoryEnum } from '@/types/plan'

type ExpenseTable = {
  category: string
  totalCost: number
  expenseName?: string
}

export const calculateExpenses = (day: Day): ExpenseTable[] => {
  const expenses = {
    '총 경비': 0,
    숙소비: 0,
    식사비: 0,
    활동비: 0,
    기타: 0,
  }

  day.activities.forEach((activity) => {
    const expense = activity.activityExpenses || 0

    expenses['총 경비'] += expense

    switch (activity.category) {
      case DayCategoryEnum.Accommodation:
        expenses['숙소비'] += expense
        break
      case DayCategoryEnum.Breakfast:
      case DayCategoryEnum.Lunch:
      case DayCategoryEnum.Dinner:
      case DayCategoryEnum.Cafe:
        expenses['식사비'] += expense
        break
      case DayCategoryEnum.Activity:
        expenses['활동비'] += expense
        break
      case DayCategoryEnum.Etc:
        expenses['기타'] += expense
        break
    }
  })

  return Object.entries(expenses).map(([category, totalCost]) => ({
    category,
    totalCost,
  }))
}

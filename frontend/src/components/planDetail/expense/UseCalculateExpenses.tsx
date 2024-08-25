import { useEffect, useState } from 'react'

import { Activity, DayCategoryEnum } from '@/types/plan'

type ExpenseTable = {
  category: string
  totalCost: number
}

const useCalculateExpenses = (
  planId: string,
  dayId: string,
  activitiesByDay: Activity[]
) => {
  const [expensesTable, setExpensesTable] = useState<ExpenseTable[]>([])

  useEffect(() => {
    // const fetchActivities = async () => {
    //   try {
    //     setLoading(true)
    //     setError(null)

    //     // API 호출하여 해당 날짜의 액티비티 데이터를 가져옵니다.
    //     const response = await plansApi.getExpensesByDay(planId, dayId)
    //   } catch (err) {
    //     setError('Failed to fetch activities.')
    //     console.error(err)
    //   } finally {
    //     setLoading(false)
    //   }
    // }

    // fetchActivities()

    const expenses = {
      '총 경비': 0,
      숙소비: 0,
      식사비: 0,
      활동비: 0,
      기타: 0,
    }

    activitiesByDay.forEach((activity) => {
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

    const expenseTable = Object.entries(expenses).map(
      ([category, totalCost]) => ({
        category,
        totalCost,
      })
    )

    setExpensesTable(expenseTable)
  }, [planId, dayId, activitiesByDay])

  return { expensesTable }
}

export default useCalculateExpenses

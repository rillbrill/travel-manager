import { useEffect, useState } from 'react'

import { getDayActivities } from '@/api/activities' // 새로 추가한 API 호출 함수
import { Day, DayCategoryEnum } from '@/types/plan'

type ExpenseTable = {
  category: string
  totalCost: number
}

const useCalculateExpenses = (planId: string, dayId: string) => {
  const [expensesTable, setExpensesTable] = useState<ExpenseTable[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true)
        setError(null)

        // API 호출하여 해당 날짜의 액티비티 데이터를 가져옵니다.
        const day: Day = await getDayActivities(planId, dayId)

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

        const expenseTable = Object.entries(expenses).map(
          ([category, totalCost]) => ({
            category,
            totalCost,
          })
        )

        setExpensesTable(expenseTable)
      } catch (err) {
        setError('Failed to fetch activities.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [planId, dayId])

  return { expensesTable, loading, error }
}

export default useCalculateExpenses

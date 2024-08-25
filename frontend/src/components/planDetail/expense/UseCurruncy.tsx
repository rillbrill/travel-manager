import { useEffect, useState } from 'react'

import { plansApi } from '@/api/plans'
import { HttpStatusCodeEnum } from '@/types'
import { Activity, DayCategoryEnum } from '@/types/plan'

type ExpenseTable = {
  category: string
  totalCost: number
  convertedCost?: number
}

const UseCurruncy = (
  planId: string,
  dayId: string,
  activitiesByDay: Activity[]
) => {
  const [expensesTable, setExpensesTable] = useState<ExpenseTable[]>([])
  const [countryCode, setCountryCode] = useState<string>('')

  useEffect(() => {
    const fetchCountryCode = async () => {
      const response = await plansApi.getCountryCode(planId || '')

      if (response?.status === HttpStatusCodeEnum.OK) {
        setCountryCode(response.data)
      }
    }

    fetchCountryCode()
  }, [planId])

  useEffect(() => {
    const calculateExpenses = () => {
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

      return Object.entries(expenses).map(([category, totalCost]) => ({
        category,
        totalCost,
      }))
    }

    const convertCurrency = async (amount: number) => {
      if (!countryCode) return 0

      const response = await plansApi.convertCurrency({
        from: 'KRW',
        to: countryCode,
        amount,
      })

      if (response?.status === HttpStatusCodeEnum.OK) {
        return Number(response.data.converted.value.toFixed(1))
      }
      return 0
    }

    const convertExpensesToCurrency = async () => {
      const expensesTable = calculateExpenses()

      const updatedTable = await Promise.all(
        expensesTable.map(async (expense) => {
          const convertedCost = await convertCurrency(expense.totalCost)
          return {
            ...expense,
            convertedCost,
          }
        })
      )

      setExpensesTable(updatedTable)
    }

    convertExpensesToCurrency()
  }, [activitiesByDay, countryCode, planId, dayId])

  return { countryCode, expensesTable }
}

export default UseCurruncy

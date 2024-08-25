import React, { Dispatch, SetStateAction } from 'react'

import { Activity } from '@/types/plan'

import { ActivityItem } from '../activity'
import useCalculateExpenses from './UseCalculateExpenses'

type ExpenseTableProps = {
  planId: string
  dayId: string
  activitiesByDay: Activity[]
  setActivitiesByDay: Dispatch<SetStateAction<Activity[]>>
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  planId,
  dayId,
  activitiesByDay,
  setActivitiesByDay,
}) => {
  const { expensesTable: expenses } = useCalculateExpenses(
    planId,
    dayId,
    activitiesByDay
  )

  // if (loading) return <div>Loading expenses...</div>
  // if (error) return <div>Error loading expenses: {error}</div>

  return (
    <>
      <table className="mr-5">
        <thead>
          <tr className="text-right">
            <th className="pb-2"> </th>
            <th className="pb-2">₩</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.category}>
              <td className="py-1.5 text-left text-sm font-semibold">
                {expense.category}
              </td>
              <td className="py-1.5 text-right text-sm">
                {expense.totalCost.toLocaleString('ko-KR')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2 flex flex-col gap-y-2 text-sm">
        {activitiesByDay.map((activity) => (
          <ActivityItem
            key={activity.id}
            planId={planId}
            dayId={dayId}
            activity={activity}
            setActivitiesByDay={setActivitiesByDay}
          />
        ))}
      </div>
    </>
  )
}

export default ExpenseTable

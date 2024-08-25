import { Droppable } from '@hello-pangea/dnd'
import React, { Dispatch, SetStateAction } from 'react'

import { Activity } from '@/types/plan'

import { ActivityItem } from '../activity'
import UseCurruncy from './UseCurruncy'

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
  const { countryCode, expensesTable: convertedExpenses } = UseCurruncy(
    planId,
    dayId,
    activitiesByDay
  )

  // if (loading) return <div>Loading expenses...</div>
  // if (error) return <div>Error loading expenses: {error}</div>

  const hasConvertedCost = countryCode !== 'KRW'

  return (
    <>
      <table className="mr-5">
        <thead>
          <tr className="text-right">
            <th className="pb-2"> </th>
            <th className="pb-2 text-sm">₩</th>
            {hasConvertedCost && (
              <th className="pb-2 text-sm">{countryCode}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {convertedExpenses.map((convertedExpense) => {
            return (
              <tr key={convertedExpense.category}>
                <td className="py-1.5 text-left text-sm font-semibold">
                  {convertedExpense.category}
                </td>
                <td className="py-1.5 text-right text-sm">
                  {convertedExpense.totalCost.toLocaleString('ko-KR')}
                </td>
                {hasConvertedCost && (
                  <td className="py-1.5 text-right text-sm">
                    {convertedExpense?.convertedCost?.toLocaleString('ko-KR') ||
                      '-'}
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
      <Droppable droppableId={dayId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            className="mt-2 flex flex-col gap-y-2 text-sm"
            {...provided.droppableProps}
          >
            {activitiesByDay.map((activity, index) => (
              <ActivityItem
                key={activity.id}
                index={index}
                planId={planId}
                dayId={dayId}
                activity={activity}
                setActivitiesByDay={setActivitiesByDay}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  )
}

export default ExpenseTable

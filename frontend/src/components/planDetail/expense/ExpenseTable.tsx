import React from 'react'

import { calculateExpenses } from './CaculateExpenses'

type ExpenseTable = {
  category: string
  totalCost: number
  expenseName?: string
}

const ExpenseTable = ({ expenses }: { expenses: ExpenseTable[] }) => {
  return (
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
  )
}

export default ExpenseTable

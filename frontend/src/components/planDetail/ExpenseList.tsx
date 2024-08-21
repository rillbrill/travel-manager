import { useState } from 'react'

import { ScheduleType } from './schedule.model'

const ScheduleList = () => {
  const [schedules, setSchedules] = useState<ExpenseType[]>([
    { category: '교통비', color: '#D3D3F3', expense: '30,000' },
    { category: '식비', color: '#EFD9A0', expense: '20,000' },
  ])

  return (
    <div className="overflow-x-auto">
      <table className="divide-gray-150 min-w-full divide-y">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              카테고리
            </th>
            <th className="px-6 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              경비
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {schedules.map((item, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap px-6 py-1.5 text-sm font-medium text-gray-900">
                <div
                  className="mx-1 rounded-lg px-2 py-1 text-center font-sans text-xs"
                  style={{ backgroundColor: item.color }}
                >
                  {item.category}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-1.5 text-gray-500">
                {item.expense}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ScheduleList

/*const ExpenseList = () => {
    return (
      <div>
        <p>경비 목록</p>
      </div>
    )
  }
  
  export default ExpenseList*/

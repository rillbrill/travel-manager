import { useState } from 'react'

import { ScheduleType } from './schedule.model'

const ScheduleList = () => {
  const [schedules, setSchedules] = useState<ScheduleType[]>([
    { category: '활동', color: '#A9C6F1', location: '모모치 해변' },
    { category: '점심', color: '#FEE2E2', location: '마그날' },
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
              장소
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {schedules.map((item, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap px-6 py-1.5 text-sm font-medium text-gray-900">
                <div
                  className="mx-1 rounded-lg px-2 py-1 font-sans text-xs"
                  style={{ backgroundColor: item.color }}
                >
                  {item.category}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-1.5 text-gray-500">
                {item.location}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ScheduleList

/*
import { useState } from 'react'

import { ScheduleType } from './schedule.model'

const ScheduleList = () => {
  const [schedules, setSchedules] = useState<ScheduleType[]>([
    { category: '활동', color: '#A9C6F1', location: '모모치 해변' },
    { category: '점심', color: '#FEE2E2', location: '마그날' },
  ])

  return (
    <div className="space-y-2">
      {schedules.map((item, index) => (
        <div key={index} className="space-x-4 space-y-2">
          <div className="flex items-center space-x-2">
            <p>카테고리</p>
            <div
              className="mx-1 rounded-lg px-2 py-1 font-sans text-xs"
              style={{ backgroundColor: item.color }}
            >
              {item.category}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <p>장소</p>
            <p>{item.location}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ScheduleList
*/

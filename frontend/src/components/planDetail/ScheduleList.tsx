import { useState } from 'react'

import { ScheduleType } from './schedule.model'

const ScheduleList = () => {
  const [schedules, setSchedules] = useState<ScheduleType[]>([
    { category: '활동', color: '#A9C6F1', location: '모모치 해변' },
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

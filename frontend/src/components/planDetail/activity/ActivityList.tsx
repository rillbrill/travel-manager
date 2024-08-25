import { useState } from 'react'

import { Activity } from '@/types/plan'

import ActivityItem from './ActivityItem'

type Props = {
  activities: Activity[]
}

function ActivityList({ activities }: Props) {
  const [editingActivityId, setEditingActivityId] = useState('')
  return (
    <div className="text-sm">
      {activities.length === 0 ? (
        <p className="my-4 text-center">등록된 일정이 없습니다.</p>
      ) : (
        <>
          {activities.map((activity) => (
            <ActivityItem
              key={activity.id}
              activity={activity}
              editingActivityId={editingActivityId}
              setEditingActivityId={setEditingActivityId}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default ActivityList

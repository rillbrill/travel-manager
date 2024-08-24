import { useState } from 'react'

import { Activity } from '@/types/plan'

import ActivityItem from './ActivityItem'

type Props = {
  activities: Activity[]
  dayId: string
}

function ActivityList({ activities, dayId }: Props) {
  const [editingActivityId, setEditingActivityId] = useState('')
  return (
    <div className="text-sm">
      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          dayId={dayId}
          activity={activity}
          editingActivityId={editingActivityId}
          setEditingActivityId={setEditingActivityId}
        />
      ))}
    </div>
  )
}

export default ActivityList

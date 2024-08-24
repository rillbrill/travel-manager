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
      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          editingActivityId={editingActivityId}
          setEditingActivityId={setEditingActivityId}
        />
      ))}
    </div>
  )
}

export default ActivityList

/*
import { Activity } from '@/types/plan'

import ActivityItem from './ActivityItem'

type Props = {
  activities: Activity[]
}

function ActivityList({ activities }: Props) {
  return (
    <div>
      {activities.map((activity) => (
        <ActivityItem key={activity.id} />
      ))}
    </div>
  )
}

export default ActivityList
*/

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

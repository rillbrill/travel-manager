import { Activity } from '@/types/plan'

import ActivityItem from './ActivityItem'

type Props = {
  activities: Activity[]
  dayId: string
}

function ActivityList({ activities, dayId }: Props) {
  return (
    <div className="text-sm">
      {activities.map((activity) => (
        <ActivityItem key={activity.id} dayId={dayId} activity={activity} />
      ))}
    </div>
  )
}

export default ActivityList

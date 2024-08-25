import { Droppable } from '@hello-pangea/dnd'

import { Activity } from '@/types/plan'

import ActivityItem from './ActivityItem'

type Props = {
  activities: Activity[]
  planId: string
  dayId: string
  setActivitiesByDay: (activities: Activity[]) => void
}

function ActivityList({
  activities,
  planId,
  dayId,
  setActivitiesByDay,
}: Props) {
  return (
    <Droppable droppableId={dayId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          className="text-sm"
          {...provided.droppableProps}
        >
          {activities.length === 0 ? (
            <p className="my-4 text-center">등록된 일정이 없습니다.</p>
          ) : (
            <>
              {activities.map((activity, index) => (
                <ActivityItem
                  key={activity.id}
                  index={index}
                  activity={activity}
                  planId={planId}
                  dayId={dayId}
                  setActivitiesByDay={setActivitiesByDay}
                />
              ))}
            </>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default ActivityList

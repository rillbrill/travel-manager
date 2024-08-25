import { Draggable } from '@hello-pangea/dnd'
import { useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'

import { deleteActivity, updateActivity } from '@/api/activities'
import { plansApi } from '@/api/plans'
import { SvgLoadingSpinner } from '@/components/common'
import { usePending } from '@/hooks/usePending'
import { useActivityStore } from '@/store/activity'
import { HttpStatusCodeEnum } from '@/types'
import { Activity, DaysTabEnum, EditActivityReqDto } from '@/types/plan'

import ActivityForm from './ActivityForm'
import ShowActivity from './ShowActivity'

type Props = {
  index: number
  activity: Activity
  planId: string
  dayId: string
  setActivitiesByDay: (activities: Activity[]) => void
}

function ActivityItem({
  index,
  activity,
  planId,
  dayId,
  setActivitiesByDay,
}: Props) {
  const { isPending, toggleIsPending } = usePending()
  const [isDelete, setIsDelete] = useState<boolean>()

  const {
    activity: editingItem,
    editingActivityId,
    setActivity,
    setEditingActivityId,
  } = useActivityStore()
  const activityId = activity.id

  const handleEditClick = () => {
    setEditingActivityId(activity.id)
    const editActivity: EditActivityReqDto = {
      activityName: activity.activityName,
      detail: activity.detail,
      activityLocation: activity.activityLocation,
      activityExpenses: activity.activityExpenses,
      category: activity.category,
    }
    setActivity(editActivity)
  }

  const handleSaveClick = async (payload: EditActivityReqDto) => {
    toggleIsPending(true)
    if (planId && dayId && activityId) {
      const response = await updateActivity(planId, dayId, activityId, payload)
      if (response?.status === HttpStatusCodeEnum.OK) {
        const updatedRes = await plansApi.getActivitiesByDay(planId, dayId)
        if (updatedRes?.status === HttpStatusCodeEnum.OK) {
          setActivitiesByDay(updatedRes.data)
          toggleIsPending(false)
        }
      }
    }
    setEditingActivityId('')
  }

  const handleCancelClick = () => {
    setEditingActivityId('')
  }
  const handleDeleteClick = async () => {
    setIsDelete(true)
    toggleIsPending(true)
    if (planId && dayId && activityId) {
      const response = await deleteActivity(planId, dayId, activityId)
      if (response?.status === HttpStatusCodeEnum.OK) {
        const updatedRes = await plansApi.getActivitiesByDay(planId, dayId)
        if (updatedRes?.status === HttpStatusCodeEnum.OK) {
          setActivitiesByDay(updatedRes.data)
          toggleIsPending(false)
          setIsDelete(false)
        }
      }
    }
  }

  return (
    <Draggable draggableId={activity.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          className="text-s mb-3 max-w-md rounded-lg bg-gray-50 p-4 shadow-container"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <div className="mb-2 flex justify-end space-x-2">
            <button onClick={handleEditClick}>
              <FiEdit3 />
            </button>
            <button onClick={handleDeleteClick}>
              {isDelete && isPending ? (
                <SvgLoadingSpinner className="size-4 text-gray-300" />
              ) : (
                <RiDeleteBin6Line />
              )}
            </button>
          </div>

          {editingActivityId === activity.id ? (
            <ActivityForm
              currentTab={DaysTabEnum.Activity}
              defaultValues={editingItem}
              isEditMode={true}
              isLoading={isPending}
              handleCancel={handleCancelClick}
              handleSave={handleSaveClick}
            />
          ) : (
            <ShowActivity activity={activity} />
          )}
        </div>
      )}
    </Draggable>
  )
}

export default ActivityItem

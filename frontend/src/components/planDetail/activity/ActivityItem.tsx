import { FiEdit3 } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'

import { deleteActivity, updateActivity } from '@/api/activities'
import { useActivityStore } from '@/store/activity'
import { HttpStatusCodeEnum } from '@/types'
import { Activity, DaysTabEnum, EditActivityReqDto } from '@/types/plan'

import ActivityForm from './ActivityForm'
import ShowActivity from './ShowActivity'

type Props = {
  activity: Activity
  planId: string
  dayId: string
}

function ActivityItem({ activity, planId, dayId }: Props) {
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
    if (planId && dayId && activityId) {
      console.log('payload')
      console.log(payload)
      try {
        const response = await updateActivity(
          planId,
          dayId,
          activityId,
          payload
        )
        console.log('Update response:', response)
      } catch (error) {
        console.error('Failed to update activity:', error)
      }
    }
    setEditingActivityId('')
  }

  const handleCancelClick = () => {
    setEditingActivityId('')
  }
  const handleDeleteClick = async () => {
    console.log('delete' + planId)

    if (planId && dayId && activityId) {
      const response = await deleteActivity(planId, dayId, activityId)
      if (response?.status === HttpStatusCodeEnum.Created) {
        console.log('delete' + planId)
      }
    }
  }

  return (
    <div className="text-s mb-3 max-w-md rounded-lg bg-gray-50 p-4 shadow-container">
      <div className="mb-2 flex justify-end space-x-2">
        <button onClick={handleEditClick}>
          <FiEdit3 />
        </button>
        <button onClick={handleDeleteClick}>
          <RiDeleteBin6Line />
        </button>
      </div>

      {editingActivityId === activity.id ? (
        <ActivityForm
          currentTab={DaysTabEnum.Activity}
          defaultValues={editingItem}
          handleCancel={handleCancelClick}
          handleSave={handleSaveClick}
        />
      ) : (
        <ShowActivity activity={activity} />
      )}
    </div>
  )
}

export default ActivityItem

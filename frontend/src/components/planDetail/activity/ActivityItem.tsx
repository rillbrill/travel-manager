import { FiEdit3 } from 'react-icons/fi'
import { RiDeleteBin6Line } from 'react-icons/ri'

import { useActivityStore } from '@/store/activity'
import { Activity, AddActivityReqDto, DaysTabEnum } from '@/types/plan'

import ActivityForm from './ActivityForm'
import ShowActivity from './ShowActivity'

type Props = {
  activity: Activity
  editingActivityId: string
  setEditingActivityId: (id: string) => void
}

function ActivityItem({ activity }: Props) {
  const {
    activity: editingItem,
    editingActivityId,
    setActivity,
    setEditingActivityId,
  } = useActivityStore()

  const handleEditClick = () => {
    setEditingActivityId(activity.id)
    setActivity(activity)
  }

  const handleSaveClick = (Item: AddActivityReqDto) => {
    // acitivy 수정 api 콜
    console.log(Item)
    setEditingActivityId('')
  }

  const handleCancelClick = () => {
    setEditingActivityId('')
  }

  return (
    <div className="text-s mb-3 max-w-md rounded-lg bg-gray-50 p-4 shadow-container">
      <div className="mb-2 flex justify-end space-x-2">
        <button onClick={handleEditClick}>
          <FiEdit3 />
        </button>
        <RiDeleteBin6Line />
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

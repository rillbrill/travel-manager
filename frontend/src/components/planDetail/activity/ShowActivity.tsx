import { dayCategories } from '@/constants'
import { Activity } from '@/types/plan'
import { cn } from '@/utils/cn'

type Props = {
  activity: Activity
}

function ShowActivity({ activity }: Props) {
  const categoryName = dayCategories.find(
    (category) => category.name === activity.category
  )?.name
  const categoryColor = dayCategories.find(
    (category) => category.name === activity.category
  )?.color
  const [placeName, roadAddressName] =
    activity.activityLocation?.split('/') || []
  const style = 'inline-block min-w-20 text-nowrap text-sm text-gray-500'

  return (
    <div>
      <div className="mb-3 flex">
        <div className={style}>카테고리</div>
        <button
          className={cn([
            `rounded-md px-2 py-1 text-center text-xs ${categoryColor}`,
          ])}
        >
          {categoryName}
        </button>
      </div>
      <div className="mb-3 flex">
        <div className={style}>활동명</div>
        <div>{activity.activityName}</div>
      </div>
      {/* {placeName ? (
        <div className="mb-3 flex">
          <div className={style}>장소</div>
          <div>{placeName}</div>
        </div>
      ) : (
        <></>
      )}
      {roadAddressName ? (
        <div className="mb-3 flex">
          <div className={style}>주소</div>
          <div>{roadAddressName}</div>
        </div>
      ) : (
        <></>
      )}
      {activity.detail ? (
        <div className="mb-3 flex">
          <div className={style}>메모</div>
          <div>{activity.detail}</div>
        </div>
      ) : (
        <></>
      )}
      {activity.activityExpenses ? (
        <div className="flex">
          <div className={style}>경비</div>
          <div>{activity.activityExpenses}</div>
        </div>
      ) : (
        <></>
      )} */}
      <div className="mb-3 flex">
        <div className={style}>장소</div>
        <div>{placeName || '-'}</div>
      </div>
      <div className="mb-3 flex">
        <div className={style}>주소</div>
        <div>{roadAddressName || '-'}</div>
      </div>
      <div className="mb-3 flex">
        <div className={style}>메모</div>
        <div>{activity.detail || '-'}</div>
      </div>
      <div className="flex">
        <div className={style}>경비</div>
        <div>{activity.activityExpenses || '-'}</div>
      </div>
    </div>
  )
}

export default ShowActivity

import { usePlanStore } from '@/store/plan'
import { DateFormatTypeEnum } from '@/types'
import { formatDate } from '@/utils/formatDate'

import { Field } from '../common'

function CheckPlan() {
  const {
    plan: { name, headCount, startDate, endDate, places },
  } = usePlanStore()

  return (
    <div className="mt-3 flex flex-col gap-y-2 px-2">
      <Field name="여행명" value={name} />
      <Field name="총인원" value={`${headCount}명`} />
      <Field
        name="출발일"
        value={formatDate(DateFormatTypeEnum.DateWithSlash, startDate)}
      />
      <Field
        name="도착일"
        value={formatDate(DateFormatTypeEnum.DateWithSlash, endDate)}
      />
      <Field
        name="여행지"
        value={
          <div className="flex flex-col gap-y-2">
            {places.map((elem) => (
              <div key={elem.id} className="flex gap-x-3">
                <span className="text-nowrap">{elem.place}</span>
                <p className="text-gray-500">
                  {formatDate(DateFormatTypeEnum.DateWithSlash, elem.startDate)}{' '}
                  - {formatDate(DateFormatTypeEnum.DateWithSlash, elem.endDate)}
                </p>
              </div>
            ))}
          </div>
        }
      />
    </div>
  )
}

export default CheckPlan

import { usePlanStore } from '@/store/plan'
import { DateFormatTypeEnum } from '@/types'
import { formatDate } from '@/utils/formatDate'

import { Field } from '../common'

function CheckPlan() {
  const {
    plan: { planName, headCount, startDate, endDate, planCountry },
  } = usePlanStore()

  return (
    <div className="mt-3 flex flex-col gap-y-2 px-2">
      <Field name="여행명" value={planName} />
      <Field name="총인원" value={`${headCount.toLocaleString()}명`} />
      <Field
        name="출발일"
        value={formatDate(DateFormatTypeEnum.DateWithSlash, startDate)}
      />
      <Field
        name="도착일"
        value={formatDate(DateFormatTypeEnum.DateWithSlash, endDate)}
      />
      <Field name="여행지" value={planCountry} />
    </div>
  )
}

export default CheckPlan

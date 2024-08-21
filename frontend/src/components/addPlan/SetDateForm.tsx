import DateRangePicker from '@/components/common/DateRangePicker'
import { usePlanStore } from '@/store/plan'
import { DateFormatTypeEnum } from '@/types'
import { formatDate } from '@/utils/formatDate'

import Button from '../common/Button'

function SetDateForm() {
  const {
    plan: { startDate: defaultStartDate, endDate: defaultEndDate },
    setDates,
  } = usePlanStore()

  return (
    <div className="flex flex-col gap-y-3 sm:gap-y-6">
      <DateRangePicker
        defaultStartDate={defaultStartDate}
        defaultEndDate={defaultEndDate || undefined}
        onChange={setDates}
      />
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-6">
          <span className="text-nowrap text-sm text-gray-600">출발일</span>
          <Button
            shape="input"
            className="pointer-events-none p-2 text-center text-gray-800"
          >
            {formatDate(DateFormatTypeEnum.DateWithSlash, defaultStartDate)}
          </Button>
        </div>
        <div className="flex items-center gap-x-6">
          <span className="text-nowrap text-sm text-gray-600">도착일</span>
          <Button
            shape="input"
            className="pointer-events-none p-2 text-center text-gray-800"
          >
            {formatDate(DateFormatTypeEnum.DateWithSlash, defaultEndDate)}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SetDateForm

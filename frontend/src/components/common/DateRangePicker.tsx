import 'react-datepicker/dist/react-datepicker.css'
import '@/styles/datePicker.css'

import { ko } from 'date-fns/locale'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import { DateFormatTypeEnum } from '@/types'
import { Plan } from '@/types/plan'
import { formatDate } from '@/utils/formatDate'

type Props = {
  defaultStartDate?: Date
  defaultEndDate?: Date
  onChange: (newValue: Pick<Plan, 'startDate' | 'endDate'>) => void
}

function DateRangePicker({
  defaultStartDate,
  defaultEndDate,
  onChange,
}: Props) {
  const [startDate, setStartDate] = useState<Date | undefined>(
    defaultStartDate || new Date()
  )
  const [endDate, setEndDate] = useState<Date | undefined>(
    defaultEndDate ?? undefined
  )

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [startDate, endDate] = dates

    if (!startDate) return
    setStartDate(startDate)
    setEndDate(endDate || undefined)
    onChange({ startDate, endDate })
    console.log(dates)
  }

  return (
    <div className="flex max-h-fit w-full justify-center px-3">
      <DatePicker
        locale={ko}
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        onChange={handleDateChange}
        renderCustomHeader={({ date, increaseMonth, decreaseMonth }) => (
          <div className="flex items-center justify-around font-sans">
            <button type="button" onClick={decreaseMonth}>
              <FiChevronLeft className="text-lg text-gray-600" />
            </button>
            <span className="text-base font-bold text-gray-800">
              {formatDate(DateFormatTypeEnum.YearAndMonth, date)}
            </span>
            <button type="button" onClick={increaseMonth}>
              <FiChevronRight className="text-lg text-gray-600" />
            </button>
          </div>
        )}
      />
    </div>
  )
}

export default DateRangePicker

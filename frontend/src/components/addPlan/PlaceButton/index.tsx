import { Dispatch, SetStateAction } from 'react'
import { FiX } from 'react-icons/fi'

import { randomBgColorClassNames } from '@/constants'
import { DateFormatTypeEnum } from '@/types'
import { NullableDate, Place } from '@/types/plan'
import { cn } from '@/utils/cn'
import { formatDate } from '@/utils/formatDate'

type Props = {
  index: number
  id: number
  place: string
  startDate: NullableDate
  endDate: NullableDate
  setCurrentPlace: Dispatch<SetStateAction<Place | null>>
  removePlace: (id: number) => void
}

function PlaceButton({
  index,
  id,
  place,
  startDate,
  endDate,
  setCurrentPlace,
  removePlace,
}: Props) {
  return (
    <div
      className={cn([
        'flex items-center gap-x-2 rounded-md p-2 text-sm text-white',
        randomBgColorClassNames[index % randomBgColorClassNames.length],
      ])}
    >
      <button
        type="button"
        className="text-sm"
        onClick={() => setCurrentPlace({ id, place, startDate, endDate })}
      >
        {place}
        {startDate &&
          endDate &&
          ` ${formatDate(DateFormatTypeEnum.MonthAndDay, startDate)} - ${formatDate(DateFormatTypeEnum.MonthAndDay, endDate)}`}
      </button>
      <button type="button" className="">
        <FiX className="text-lg text-white" onClick={() => removePlace(id)} />
      </button>
    </div>
  )
}

export default PlaceButton

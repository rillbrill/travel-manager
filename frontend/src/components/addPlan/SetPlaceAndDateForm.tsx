import { useMemo } from 'react'

import { useModal } from '@/hooks/useModal'
import { usePlanStore } from '@/store/plan'
import { DateFormatTypeEnum } from '@/types'
import { formatDate } from '@/utils/formatDate'

import { Button, DateRangePicker, Field } from '../common'
import SelectPlaceModal from './SelectPlaceModal'

function SetPlaceAndDateForm() {
  const {
    plan: { planCountry, startDate, endDate },
    setDates,
    setPlanCountry,
  } = usePlanStore()
  const { isModalOpen, openModal, closeModal } = useModal()
  const isDatesSelected = useMemo(
    () => startDate && endDate,
    [startDate, endDate]
  )

  const selectPlace = (place: string) => {
    setPlanCountry(place)
    closeModal()
  }

  return (
    <>
      <div className="mt-2 flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-3">
          <Field
            name="여행기간"
            value={
              isDatesSelected
                ? `${formatDate(DateFormatTypeEnum.DateWithSlash, startDate)} -
            ${formatDate(DateFormatTypeEnum.DateWithSlash, endDate)}`
                : ''
            }
          />
          <DateRangePicker
            defaultStartDate={startDate}
            defaultEndDate={endDate}
            onChange={(startDate, endDate) => setDates(startDate, endDate)}
          />
        </div>

        <Field
          name="여행지"
          value={
            planCountry ? (
              <div className="flex w-full items-center justify-between gap-x-3 pr-6">
                <p>{planCountry}</p>
                <Button
                  className="rounded-[4px] px-3 py-1 text-sm outline-button"
                  onClick={openModal}
                >
                  수정하기
                </Button>
              </div>
            ) : (
              <Button
                shape="input"
                className="border-blue-500 text-blue-500"
                isFull
                onClick={openModal}
              >
                여행지 선택하기
              </Button>
            )
          }
        />
      </div>

      {isModalOpen && (
        <SelectPlaceModal closeModal={closeModal} selectPlace={selectPlace} />
      )}
    </>
  )
}

export default SetPlaceAndDateForm

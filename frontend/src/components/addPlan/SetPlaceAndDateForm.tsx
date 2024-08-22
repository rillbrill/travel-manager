import { useState } from 'react'
import { FiPlusSquare } from 'react-icons/fi'

import { useModal } from '@/hooks/useModal'
import { usePlanStore } from '@/store/plan'
import { NullableDate, Place } from '@/types/plan'

import { Button, DateRangePicker } from '../common'
import PlaceButton from './PlaceButton'
import SelectPlaceModal from './SelectPlaceModal'

function SetPlaceAndDateForm() {
  const {
    plan: { places },
    setDates,
    setPlaces,
  } = usePlanStore()
  const [currentPlace, setCurrentPlace] = useState<Place | null>(null)
  const { isModalOpen, openModal, closeModal } = useModal()

  const addPlace = (newPlace: Place) => {
    setPlaces([...places, newPlace])
    setCurrentPlace(newPlace)
    closeModal()
  }
  const removePlace = (id: number) => {
    setPlaces(places.filter((elem) => elem.id !== id))
    setCurrentPlace(null)
  }
  const setDatesByPlace = (startDate: NullableDate, endDate: NullableDate) => {
    if (!currentPlace) return

    const updatedCurrentPlace = { ...currentPlace, startDate, endDate }
    setCurrentPlace(updatedCurrentPlace)

    const updatedPlaces = places.map((elem) => {
      if (elem.place === currentPlace.place && elem.id === currentPlace.id) {
        return { ...elem, startDate, endDate }
      }
      return elem
    })
    setPlaces(updatedPlaces)

    const totalStartDate = startDate
      ? new Date(
          Math.min(
            ...updatedPlaces
              .filter((elem) => !!elem.startDate)
              .map((elem) => elem.startDate!.getTime())
          )
        )
      : null
    const totalEndDate = endDate
      ? new Date(
          Math.max(
            ...updatedPlaces
              .filter((elem) => !!elem.endDate)
              .map((elem) => elem.endDate!.getTime())
          )
        )
      : null
    setDates(totalStartDate, totalEndDate)
  }

  return (
    <>
      <div className="mt-2 flex w-full flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <div className="flex items-end justify-between px-1">
            <p className="text-sm text-gray-500">
              * 여행지를 클릭하여 여행할 날짜를 설정해주세요.
            </p>
            <Button
              type="button"
              isFull={false}
              className="bg-transparent p-0 text-primary-default"
              onClick={openModal}
            >
              <FiPlusSquare className="text-3xl" />
            </Button>
          </div>

          <div className="flex min-h-16 w-full flex-wrap items-center gap-2 rounded-md border border-gray-300 p-4">
            {places.length === 0 && (
              <p className="text-gray-400">여행지를 추가해주세요.</p>
            )}
            {places.length > 0 &&
              places.map((elem, index) => (
                <PlaceButton
                  key={index}
                  index={index}
                  {...elem}
                  setCurrentPlace={setCurrentPlace}
                  removePlace={removePlace}
                />
              ))}
          </div>
        </div>

        {currentPlace && (
          <DateRangePicker
            defaultStartDate={currentPlace.startDate}
            defaultEndDate={currentPlace.endDate || undefined}
            onChange={setDatesByPlace}
          />
        )}
      </div>

      {isModalOpen && (
        <SelectPlaceModal closeModal={closeModal} addPlace={addPlace} />
      )}
    </>
  )
}

export default SetPlaceAndDateForm

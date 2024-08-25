import { useEffect, useMemo, useState } from 'react'

import { plansApi } from '@/api/plans'
import { Button, Modal, SvgLoadingSpinner } from '@/components/common'
import { HttpStatusCodeEnum } from '@/types'
import { PlacesResDto } from '@/types/plan'

type Props = {
  closeModal: () => void
  selectPlace: (place: string) => void
}

function SelectPlaceModal({ closeModal, selectPlace }: Props) {
  const [places, setPlaces] = useState<PlacesResDto>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const countries = useMemo(
    () => [...new Set(places.map((elem) => elem.countryName))],
    [places]
  )
  const selectedPlaces = useMemo(
    () => places.filter((elem) => elem.countryName === selectedCountry),
    [selectedCountry]
  )

  useEffect(() => {
    const fetchData = async () => {
      const response = await plansApi.getPlaces()
      if (response?.status === HttpStatusCodeEnum.OK) {
        setPlaces(response.data)
        setSelectedCountry(response.data[0].countryName)
      }
    }

    fetchData()
  }, [])

  return (
    <Modal title="여행지 선택" closeModal={closeModal}>
      {places.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <SvgLoadingSpinner className="fill-blue-500" />
        </div>
      ) : (
        <div className="flex flex-col gap-y-6">
          <select
            className="cursor-pointer rounded-md border border-gray-300 px-4 py-1 text-center"
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <div className="flex max-h-60 flex-col gap-y-3 overflow-y-auto no-scrollbar">
            {selectedPlaces.map((elem) => (
              <div
                key={`${elem.countryName} ${elem.cityName}`}
                className="flex w-full items-center justify-between"
              >
                <span className="text-sm">
                  {elem.countryName} {elem.cityName}
                </span>
                <Button
                  className="border border-blue-500 bg-gray-50 px-3 py-1 text-sm text-blue-500"
                  onClick={() =>
                    selectPlace(`${elem.countryName} ${elem.cityName}`)
                  }
                >
                  선택
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  )
}

export default SelectPlaceModal

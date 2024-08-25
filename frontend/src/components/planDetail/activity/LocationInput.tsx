import { useMemo } from 'react'

import { Button } from '@/components/common'
import { useModal } from '@/hooks/useModal'
import { AddActivityReqDto } from '@/types/plan'

import SelectLocationModal from './SelectLocationModal'

type Props = {
  defaultValue: string | null
  updatePayload: (value: Partial<AddActivityReqDto>) => void
}

function LocationInput({ defaultValue, updatePayload }: Props) {
  const { isModalOpen, openModal, closeModal } = useModal()
  const [placeName, placeAddress] = useMemo(
    () => (defaultValue ? defaultValue.split('/') : ''),
    [defaultValue]
  )

  return (
    <>
      {defaultValue ? (
        <div className="flex items-center justify-between gap-x-2 text-sm">
          <div>
            <p>{placeName}</p>
            <p className="text-gray-500">{placeAddress}</p>
          </div>

          <Button
            className="text-nowrap rounded-[4px] px-3 py-1 text-sm outline-button"
            onClick={openModal}
          >
            수정하기
          </Button>
        </div>
      ) : (
        <Button
          shape="input"
          className="py-1.5 text-sm outline-button"
          isFull
          onClick={openModal}
        >
          장소 설정하기
        </Button>
      )}

      {isModalOpen && (
        <SelectLocationModal
          closeModal={closeModal}
          updatePayload={updatePayload}
        />
      )}
    </>
  )
}

export default LocationInput

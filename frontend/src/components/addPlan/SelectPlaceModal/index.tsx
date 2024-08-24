import { Button, Modal } from '@/components/common'

type Props = {
  closeModal: () => void
  selectPlace: (place: string) => void
}

const dummyPlaces = [
  {
    id: 0,
    place: '서울, 대한민국',
    startDate: null,
    endDate: null,
  },
  {
    id: 1,
    place: '부산, 대한민국',
    startDate: null,
    endDate: null,
  },
  {
    id: 2,
    place: '서울, 대한민국',
    startDate: null,
    endDate: null,
  },
  {
    id: 3,
    place: '부산, 대한민국',
    startDate: null,
    endDate: null,
  },
  {
    id: 4,
    place: '서울, 대한민국',
    startDate: null,
    endDate: null,
  },
  {
    id: 5,
    place: '부산, 대한민국',
    startDate: null,
    endDate: null,
  },
]

function SelectPlaceModal({ closeModal, selectPlace }: Props) {
  // TODO: place list api call
  return (
    <Modal title="여행지 선택" closeModal={closeModal}>
      <div className="flex max-h-52 flex-col gap-y-3 overflow-y-auto">
        {dummyPlaces.map((elem, index) => (
          <div key={index} className="flex w-full items-center justify-between">
            <span>{elem.place}</span>
            <Button
              type="button"
              className="border border-blue-500 bg-gray-50 px-3 py-1 text-blue-500"
              onClick={() => selectPlace(elem.place)}
            >
              선택
            </Button>
          </div>
        ))}
      </div>
    </Modal>
  )
}

export default SelectPlaceModal

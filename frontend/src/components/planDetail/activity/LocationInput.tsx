import { Button } from '@/components/common'
import { ActivityReqDto } from '@/types/plan'

type Props = {
  defaultValue: string | null
  updatePayload: (value: Partial<ActivityReqDto>) => void
}

function LocationInput({ defaultValue, updatePayload }: Props) {
  // const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <>
      <Button shape="input" className="p-2 text-sm">
        {defaultValue || '장소를 설정해주세요'}
      </Button>
    </>
  )
}

export default LocationInput

import Button from '@/components/common/Button'

import MoveStepButtons from '../MoveStepButtons'

type Props = {
  currentStep: number
  moveStep: (step: number) => void
}

function SetPlaceForm({ currentStep, moveStep }: Props) {
  return (
    <div className="flex w-full flex-1 flex-col justify-between">
      <div className="flex flex-col gap-y-4">
        <Button shape="input">여행지 선택하기</Button>
      </div>

      <MoveStepButtons stepIndex={currentStep} moveStep={moveStep} />
    </div>
  )
}

export default SetPlaceForm

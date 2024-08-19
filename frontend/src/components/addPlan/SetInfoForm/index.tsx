import Input from '@/components/common/Input'

import MoveStepButtons from '../MoveStepButtons'

type Props = {
  currentStep: number
  moveStep: (step: number) => void
}

function SetInfoForm({ currentStep, moveStep }: Props) {
  return (
    <form className="flex w-full flex-1 flex-col justify-between">
      <div className="flex flex-col gap-y-4">
        <Input
          type="text"
          label="여행명"
          placeholder="여행명을 입력해주세요"
          // TODO
          onChange={() => {}}
        />
        <Input
          type="number"
          label="총 인원"
          // TODO
          onChange={() => {}}
        />
      </div>

      <MoveStepButtons stepIndex={currentStep} moveStep={moveStep} />
    </form>
  )
}

export default SetInfoForm

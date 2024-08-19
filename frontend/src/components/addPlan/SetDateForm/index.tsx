import MoveStepButtons from '../MoveStepButtons'

type Props = {
  currentStep: number
  moveStep: (step: number) => void
}

function SetDateForm({ currentStep, moveStep }: Props) {
  return (
    <form className="flex w-full flex-1 flex-col justify-between">
      <div></div>

      <MoveStepButtons stepIndex={currentStep} moveStep={moveStep} />
    </form>
  )
}

export default SetDateForm

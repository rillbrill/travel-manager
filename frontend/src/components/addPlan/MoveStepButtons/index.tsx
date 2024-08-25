import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import Button from '@/components/common/Button'
import { AddPlanStepEnum } from '@/types'
import { cn } from '@/utils/cn'

type Props = {
  stepIndex: number
  isValid?: boolean
  isLoading?: boolean
  moveStep: (step: number) => void
  handleSubmit: () => Promise<void>
}

function MoveStepButtons({
  stepIndex,
  isValid,
  isLoading,
  moveStep,
  handleSubmit,
}: Props) {
  const isFirstStep = stepIndex === 0
  const isLastStep = stepIndex === Object.keys(AddPlanStepEnum).length / 2 - 1
  const hasOneButton = isFirstStep
  const hasTwoButtons = !hasOneButton

  const moveToPrevStep = () => {
    moveStep(stepIndex - 1)
  }
  const moveToNextStep = () => {
    moveStep(stepIndex + 1)
  }

  return (
    <div
      className={cn([
        'w-full',
        hasTwoButtons && 'flex w-full items-center justify-between',
      ])}
    >
      {hasOneButton && (
        <Button isFull isDisabled={!isValid} onClick={moveToNextStep}>
          <span className="text-sm">다음 단계로</span>
          <FiChevronRight className="text-lg" />
        </Button>
      )}
      {hasTwoButtons && (
        <>
          <Button
            className="text-gray-800 outline-button"
            onClick={moveToPrevStep}
          >
            <FiChevronLeft className="text-lg text-blue-500" />
            <span className="text-sm text-blue-500">이전 단계로</span>
          </Button>
          {isLastStep ? (
            <Button
              isLoading={isLoading}
              isDisabled={!isValid}
              onClick={handleSubmit}
            >
              <span className="text-sm">완료하기</span>
              <FiChevronRight className="text-lg" />
            </Button>
          ) : (
            <Button isDisabled={!isValid} onClick={moveToNextStep}>
              <span className="text-sm">다음 단계로</span>
              <FiChevronRight className="text-lg" />
            </Button>
          )}
        </>
      )}
    </div>
  )
}

export default MoveStepButtons

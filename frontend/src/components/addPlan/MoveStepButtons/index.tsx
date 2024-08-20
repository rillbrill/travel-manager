import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import Button from '@/components/common/Button'
import { AddPlanStepEnum } from '@/types'
import { cn } from '@/utils/cn'

type Props = {
  stepIndex: number
  isValid: boolean
  moveStep: (step: number) => void
}

function MoveStepButtons({ stepIndex, isValid, moveStep }: Props) {
  const isFirstStep = stepIndex === 0
  const isLastStep = stepIndex === Object.keys(AddPlanStepEnum).length - 1
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
        <Button isFull={true} isDisabled={!isValid} onClick={moveToNextStep}>
          <span>다음 단계로</span>
          <FiChevronRight className="text-lg" />
        </Button>
      )}
      {hasTwoButtons && (
        <>
          <Button
            className="w-40 border border-blue-500 bg-transparent text-gray-800"
            isFull={false}
            onClick={moveToPrevStep}
          >
            <FiChevronLeft className="text-lg text-blue-500" />
            <span className="text-blue-500">이전 단계로</span>
          </Button>
          <Button
            className="w-40"
            isFull={false}
            isDisabled={!isValid}
            onClick={moveToNextStep}
          >
            <span>{isLastStep ? '완료하기' : '다음 단계로'}</span>
            <FiChevronRight className="text-lg" />
          </Button>
        </>
      )}
    </div>
  )
}

export default MoveStepButtons

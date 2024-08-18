import { FiCalendar, FiMapPin, FiUser } from 'react-icons/fi'

import { AddPlanStepEnum } from '@/types'
import { cn } from '@/utils/cn'

import StepperItem from './StepperItem'

type Props = {
  currentStep: AddPlanStepEnum
}

const steps = [
  {
    step: '여행 정보 설정',
    icon: <FiUser />,
  },
  {
    step: '여행 날짜 설정',
    icon: <FiCalendar />,
  },
  {
    step: '여행지 설정',
    icon: <FiMapPin />,
  },
]

function Stepper({ currentStep }: Props) {
  return (
    <div className="flex items-center gap-x-2">
      {steps.map((elem, index) => {
        const isLastStep = index === steps.length - 1
        const isDoneStep = index + 1 < currentStep

        return (
          <div className="flex" key={elem.step}>
            <StepperItem
              step={elem.step}
              icon={elem.icon}
              isCurrentStep={currentStep === index + 1}
              isDoneStep={isDoneStep}
            />
            {!isLastStep && (
              <div
                className={cn([
                  'mt-4 h-[2px] w-12',
                  isDoneStep ? 'bg-blue-500' : 'bg-gray-400',
                ])}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Stepper

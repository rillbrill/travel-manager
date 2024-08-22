import { FiList, FiMapPin, FiUser } from 'react-icons/fi'

import { cn } from '@/utils/cn'

import StepperItem from './StepperItem'

type Props = {
  currentStep: number
}

const steps = [
  {
    title: '여행 정보 설정',
    icon: <FiUser />,
  },
  {
    title: '여행지 및 날짜 설정',
    icon: <FiMapPin />,
  },
  {
    title: '여행 확인',
    icon: <FiList />,
  },
]

function Stepper({ currentStep }: Props) {
  return (
    <div className="flex items-center gap-x-2">
      {steps.map((step, index) => {
        const isLastStep = index === steps.length - 1
        const isDoneStep = index < currentStep

        return (
          <div className="flex" key={step.title}>
            <StepperItem
              step={step.title}
              icon={step.icon}
              isCurrentStep={currentStep === index}
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

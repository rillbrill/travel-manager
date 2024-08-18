import React from 'react'
import { FiCheck } from 'react-icons/fi'

import { cn } from '@/utils/cn'

type Props = {
  step: string
  icon: React.ReactNode
  isCurrentStep: boolean
  isDoneStep: boolean
}

function StepperItem({ icon, step, isCurrentStep, isDoneStep }: Props) {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <div
        className={cn([
          'flex h-10 w-10 items-center justify-center rounded-full',
          'border-2 text-lg',
          isCurrentStep || isDoneStep
            ? 'border-blue-500 text-blue-500'
            : 'border-gray-400 text-gray-400',
        ])}
      >
        {isDoneStep ? <FiCheck /> : icon}
      </div>
      <p
        className={cn([
          'text-xs md:text-sm',
          isCurrentStep || isDoneStep ? 'text-blue-500' : 'text-gray-500',
        ])}
      >
        {step}
      </p>
    </div>
  )
}

export default StepperItem

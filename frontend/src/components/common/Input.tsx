import { forwardRef, InputHTMLAttributes, useState } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'

import { cn } from '@/utils/cn'

type Props = {
  type?: 'text' | 'number'
  label?: string
  errorMessage?: string
  onNumberChange?: (newValue: number) => void
} & InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      type = 'text',
      value,
      label,
      className,
      errorMessage,
      onNumberChange,
      ...props
    },
    ref
  ) => {
    const [numberValue, setNumberValue] = useState<number | null>(
      type === 'text' ? null : Number(value)
    )

    const addNumberValue = () => {
      if (numberValue) {
        const newValue = numberValue + 1
        setNumberValue(newValue)
        if (onNumberChange) onNumberChange(newValue)
      }
    }
    const subtractNumberValue = () => {
      if (numberValue) {
        const newValue = numberValue > 1 ? numberValue - 1 : 1
        setNumberValue(newValue)
        if (onNumberChange) onNumberChange(newValue)
      }
    }

    return (
      <div className="relative flex w-full flex-col gap-y-2">
        {!!label && <label className="text-sm text-gray-500">{label}</label>}
        {/* text type input */}
        {type === 'text' && (
          <input
            ref={ref}
            className={cn([
              'w-full rounded-lg border border-gray-300 py-3 pl-3 pr-2',
              className,
            ])}
            {...props}
          />
        )}

        {/* number type input */}
        {type === 'number' && numberValue && (
          <div className="relative">
            <input
              ref={ref}
              value={numberValue}
              className={cn([
                'w-full rounded-lg border border-gray-300 px-2 py-3',
                'cursor-default text-center',
                'pointer-events-none',
                className,
              ])}
              {...props}
            />
            <button
              type="button"
              className="absolute left-4 top-3 flex h-6 w-6 items-center justify-center text-lg"
              onClick={subtractNumberValue}
            >
              <FiMinus />
            </button>
            <button
              type="button"
              className="absolute right-4 top-3 flex h-6 w-6 items-center justify-center text-lg"
              onClick={addNumberValue}
            >
              <FiPlus />
            </button>
          </div>
        )}
        {!!errorMessage && (
          <p className="absolute bottom-[-24px] left-0 text-sm text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input

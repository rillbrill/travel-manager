import { InputHTMLAttributes, useRef } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'

import { cn } from '@/utils/cn'

type Props = {
  type?: 'text' | 'number'
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

function Input({
  type = 'text',
  value,
  label,
  className,
  onClick,
  ...props
}: Props) {
  const numberTypeInputRef = useRef<HTMLInputElement>(null)

  const addNumberValue = () => {
    if (numberTypeInputRef.current) {
      const newValue = Number(numberTypeInputRef.current.value) || 1
      numberTypeInputRef.current.value = (newValue + 1).toString()
    }
  }
  const subtractNumberValue = () => {
    if (numberTypeInputRef.current) {
      const newValue = Number(numberTypeInputRef.current.value) || 1
      numberTypeInputRef.current.value = (
        newValue > 1 ? newValue - 1 : 1
      ).toString()
    }
  }

  return (
    <div className="flex w-full flex-col gap-y-2">
      {!!label && <label className="text-sm text-gray-500">{label}</label>}
      {/* text type input */}
      {type === 'text' && (
        <input
          value={value || ''}
          className={cn([
            'w-full rounded-lg border border-gray-300 px-2 py-3',
            className,
          ])}
          {...props}
        />
      )}
      {/* number type input */}
      {type === 'number' && (
        <div className="relative">
          <input
            ref={numberTypeInputRef}
            value={value || 1}
            className={cn([
              'w-full rounded-lg border border-gray-300 px-2 py-3',
              'cursor-default text-center',
              'pointer-events-none',
              className,
            ])}
            {...props}
          />
          <button
            className="absolute left-4 top-3 flex h-6 w-6 items-center justify-center text-lg"
            onClick={subtractNumberValue}
          >
            <FiMinus />
          </button>
          <button
            className="absolute right-4 top-3 flex h-6 w-6 items-center justify-center text-lg"
            onClick={addNumberValue}
          >
            <FiPlus />
          </button>
        </div>
      )}
    </div>
  )
}

export default Input

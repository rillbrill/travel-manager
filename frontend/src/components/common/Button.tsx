import { ButtonHTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

import { SvgLoadingSpinner } from '.'

type Props = {
  children: React.ReactNode | string
  shape?: 'button' | 'input'
  label?: string
  isFull?: boolean
  isDisabled?: boolean
  isLoading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

function Button({
  type = 'button',
  children,
  shape = 'button',
  label,
  className,
  isFull,
  isLoading,
  isDisabled,
  ...props
}: Props) {
  const hasLabel = !!label

  return (
    <div className={cn(['flex flex-col gap-y-2', isFull ? 'w-full' : 'w-fit'])}>
      {hasLabel && <span className="text-sm text-gray-500">{label}</span>}
      <button
        type={type}
        className={cn([
          shape === 'input'
            ? 'w-full rounded-lg border border-gray-300 bg-white px-2 py-3 text-gray-400'
            : 'flex w-full cursor-pointer items-center justify-center rounded-lg bg-blue-500 p-3 text-white',
          isDisabled && 'cursor-default bg-gray-400',
          className,
        ])}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? <SvgLoadingSpinner className="mx-4" /> : children}
      </button>
    </div>
  )
}

export default Button

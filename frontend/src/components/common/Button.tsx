import { HTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

type Props = {
  children: React.ReactNode
} & HTMLAttributes<HTMLButtonElement>

function Button({ children, className, ...props }: Props) {
  return (
    <button
      className={cn([
        'w-full rounded-lg bg-blue-500 p-3 text-white',
        'flex items-center justify-center gap-x-2',
        className,
      ])}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

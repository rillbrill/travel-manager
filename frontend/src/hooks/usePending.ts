import { useState } from 'react'

export const usePending = () => {
  const [isPending, setIsPending] = useState<boolean>(false)

  const toggleIsPending = (state: boolean) => {
    setIsPending(state)
  }

  return { isPending, toggleIsPending }
}

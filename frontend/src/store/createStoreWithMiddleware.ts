import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { StoreNameEnum } from '@/types'

export const createStoreWithMiddleware = <T>(
  initializer: StateCreator<
    T,
    [['zustand/devtools', never], ['zustand/immer', never]],
    []
  >,
  name: StoreNameEnum
) => {
  return create<T>()(devtools(immer(initializer), { name }))
}

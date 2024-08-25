import { StoreNameEnum } from '@/types'

import { createStoreWithMiddleware } from './createStoreWithMiddleware'

type TStoreState = {
  isLoggedIn: boolean
}

type TTokenName = 'accessToken' | 'refreshToken'
type TStoreAction = {
  authLogin: (tokenName: TTokenName, tokenValue: string) => void
  authLogout: (tokenName: TTokenName) => void
}

export function getToken(tokenName: TTokenName) {
  const token = localStorage.getItem(tokenName)
  return token
}

export function setToken(tokenName: TTokenName, tokenValue: string) {
  localStorage.setItem(tokenName, tokenValue)
}

export function removeToken(tokenName: TTokenName) {
  localStorage.removeItem(tokenName)
}

export const useAuthStore = createStoreWithMiddleware<
  TStoreState & TStoreAction
>(
  (set) => ({
    isLoggedIn: false,
    authLogin: (tokenName: TTokenName, tokenValue: string) =>
      set((state: TStoreState) => {
        state.isLoggedIn = true
        setToken(tokenName, tokenValue)
      }),
    authLogout: (tokenName: TTokenName) =>
      set((state: TStoreState) => {
        state.isLoggedIn = false
        removeToken(tokenName)
      }),
  }),
  StoreNameEnum.Auth
)

// export const useAuthStore = create<TStoreState & TStoreAction>()(
//   devtools(
//     immer((set) => ({
//       isLoggedIn: getToken('accessToken') ? true : false,
//       authLogin: (tokenName: TTokenName, tokenValue: string) =>
//         set((state: TStoreState) => {
//           state.isLoggedIn = true
//           setToken(tokenName, tokenValue)
//         }),
//       authLogout: (tokenName: TTokenName) =>
//         set((state: TStoreState) => {
//           state.isLoggedIn = false
//           removeToken(tokenName)
//         }),
//     })),
//     { name: 'authStore' }
//   )
// )

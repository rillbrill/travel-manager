import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

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
  localStorage.setItem(tokenValue, tokenName)
}

export function removeToken(tokenName: TTokenName) {
  localStorage.removeItem(tokenName)
}

export const useAuthStore = create<TStoreState & TStoreAction>()(
  devtools(
    immer((set) => ({
      isLoggedIn: getToken('accessToken') ? true : false,
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
    })),
    { name: 'authStore' }
  )
)

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type TStoreState = {
  isLoggedIn: boolean
}

type TTokenName = 'accessToken' | 'refreshToken'
type TStoreAction = {
  authLogin: (tokenValue: string, tokenName: TTokenName) => void
  authLogout: (tokenName: TTokenName) => void
}

export function getToken() {
  const accessToken = localStorage.getItem('accessToken')
  return accessToken
}

function setToken(tokenValue: string, tokenName: TTokenName) {
  localStorage.setItem(tokenName, tokenValue)
}

function removeToken(tokenName: TTokenName) {
  localStorage.removeItem(tokenName)
}

export const useAuthStore = create<TStoreState & TStoreAction>()(
  devtools(
    immer((set) => ({
      isLoggedIn: getToken() ? true : false,
      authLogin: (tokenValue: string, tokenName: TTokenName) =>
        set((state: TStoreState) => {
          state.isLoggedIn = true
          setToken(tokenValue, tokenName)
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

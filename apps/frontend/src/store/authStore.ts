import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/lib/api'
import { getToken, setToken, removeToken } from '@/lib/auth'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (token: string, user: User) => void
  clearAuth: () => void
  initialize: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (token: string, user: User) => {
        setToken(token)
        set({ token, user, isAuthenticated: true })
      },
      clearAuth: () => {
        removeToken()
        set({ token: null, user: null, isAuthenticated: false })
      },
      initialize: () => {
        const token = getToken()
        if (token) {
          set({ token, isAuthenticated: true })
        } else {
          set({ token: null, user: null, isAuthenticated: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)


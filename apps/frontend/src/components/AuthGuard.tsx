'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { Splash } from '@/app/components/Splash'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const initialize = useAuthStore((state) => state.initialize)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Initialize auth state from localStorage
    initialize()
    setIsInitialized(true)
  }, [initialize])

  useEffect(() => {
    if (!isInitialized) return

    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push('/landing')
    }
  }, [isAuthenticated, isInitialized, router])

  // Show splash while initializing or if not authenticated
  if (!isInitialized || !isAuthenticated) {
    return <Splash />
  }

  return <>{children}</>
}


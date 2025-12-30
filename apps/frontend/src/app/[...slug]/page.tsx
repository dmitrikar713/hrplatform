'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { Splash } from '../components/Splash'

export default function CatchAllPage() {
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

    // Redirect based on auth state
    if (isAuthenticated) {
      router.push('/home')
    } else {
      router.push('/landing')
    }
  }, [isAuthenticated, isInitialized, router])

  // Show splash while checking auth state
  return <Splash />
}


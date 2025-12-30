'use client'

import { AppShell, NavLink, Group, Text, Button } from '@mantine/core'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { useEffect, useState } from 'react'
import { Splash } from '../../app/components/Splash'
import { isPublicRoute, ROUTES } from '@/routes'
import { Navbar } from '../navbar/navbar'

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const initialize = useAuthStore((state) => state.initialize)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Initialize auth state from localStorage
    initialize()
    setIsInitialized(true)
  }, [initialize])

  useEffect(() => {
    if (!isInitialized) return

    // If trying to access protected route without auth, redirect to landing
    if (!isAuthenticated && !isPublicRoute(pathname)) {
      router.push(ROUTES.ABOUT)
    }
  }, [isAuthenticated, isInitialized, pathname, router])

  // Show splash while initializing auth state
  if (!isInitialized) {
    return <Splash />
  }

  return (
    <AppShell
      navbar={{
        width: 250,
        breakpoint: 'sm',
      }}
      padding="md"
    >
      <Navbar />
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}

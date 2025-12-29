'use client'

import { AppShell, NavLink, Group, Text, Button } from '@mantine/core'
import { IconHome, IconUsers, IconSettings, IconBuilding, IconUser, IconLogout } from '@tabler/icons-react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { useEffect } from 'react'

const navigationItems = [
  { label: 'Home', href: '/', icon: IconHome },
  { label: 'Users', href: '/users', icon: IconUsers },
  { label: 'Companies', href: '/companies', icon: IconBuilding },
  { label: 'Settings', href: '/settings', icon: IconSettings },
]

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const initialize = useAuthStore((state) => state.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  const handleSignOut = () => {
    clearAuth()
    router.push('/sign-in')
  }

  // Don't show sidebar if not authenticated
  if (!isAuthenticated) {
    return <>{children}</>
  }

  return (
    <AppShell
      navbar={{
        width: 250,
        breakpoint: 'sm',
      }}
      padding="md"
    >
      <AppShell.Navbar p="md">
        <Group mb="xl">
          <Text size="xl" fw={700}>
            HR Platform
          </Text>
        </Group>
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.href}
              component={Link}
              href={item.href}
              label={item.label}
              leftSection={<Icon size="1rem" stroke={1.5} />}
              active={pathname === item.href}
            />
          )
        })}
        <NavLink
          component={Link}
          href="/profile"
          label="Profile"
          leftSection={<IconUser size="1rem" stroke={1.5} />}
          active={pathname === '/profile'}
        />
        <Group mt="auto" pt="md" style={{ borderTop: '1px solid var(--mantine-color-gray-3)' }}>
          <Button
            leftSection={<IconLogout size="1rem" />}
            variant="light"
            color="red"
            fullWidth
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Group>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}


'use client'

import { privateRoutesConfigs, publicRoutesConfigs } from '@/routes'
import { useAuthStore } from '@/store/authStore'
import { AppShell, Box, NavLink, Button, Text, Group } from '@mantine/core'
import {
  IconHome,
  IconUsers,
  IconSettings,
  IconBuilding,
  IconUser,
  IconLogout,
} from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { NavbarBase } from './navbarBase'

export const PrivateNavbar = () => {
  const pathname = usePathname()

  const router = useRouter()
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const initialize = useAuthStore((state) => state.initialize)

  const handleSignOut = () => {
    clearAuth()
    router.push('/landing')
  }
  return (
    <NavbarBase>
      <Group>
        {privateRoutesConfigs.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              component={Link}
              href={item.path}
              label={item.title}
              style={{ width: 'auto' }}
              // leftSection={<Icon size="1rem" stroke={1.5} />}
              active={pathname === item.path}
            />
          )
        })}
      </Group>

      <Group>
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
    </NavbarBase>
  )
}

'use client'

import { privateRoutesConfigs, publicRoutesConfigs } from '@/routes'
import { useAuthStore } from '@/store/authStore'
import { AppShell, Group, NavLink, Button, Text, Box } from '@mantine/core'
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

export const PublicNavbar = () => {
  const pathname = usePathname()
  const router = useRouter()

  const clearAuth = useAuthStore((state) => state.clearAuth)

  const handleSignIn = () => {
    clearAuth()
    router.push('/sign-in')
  }
  return (
    <NavbarBase>
      <Group>
        {publicRoutesConfigs.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              style={{ width: 'auto' }}
              key={item.path}
              component={Link}
              href={item.path}
              label={item.title}
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
          color="blue"
          fullWidth
          onClick={handleSignIn}
        >
          Sign in
        </Button>
      </Group>
    </NavbarBase>
  )
}

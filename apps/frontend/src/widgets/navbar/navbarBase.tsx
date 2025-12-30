'use client'

import { privateRoutesConfigs, publicRoutesConfigs } from '@/routes'
import { useAuthStore } from '@/store/authStore'
import { AppShell, Group, NavLink, Button, Text } from '@mantine/core'

export const NavbarBase = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell.Header p="md">
      <Group mb="xl">
        <Group>
          <Text size="xl" fw={700}>
            HR Platform
          </Text>
        </Group>

        {children}
      </Group>
    </AppShell.Header>
  )
}

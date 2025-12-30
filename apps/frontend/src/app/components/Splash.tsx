'use client'

import { Title, Loader, Stack } from '@mantine/core'

export function Splash() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Stack gap="md" align="center">
        <Title order={1}>HRPLATFORM</Title>
        <Loader size="lg" />
      </Stack>
    </div>
  )
}


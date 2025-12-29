'use client'

import { useEffect } from 'react'
import { MantineProvider, Button, Container, Title, Text, Stack, Card } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import '@mantine/core/styles.css'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <MantineProvider>
          <Container size="md" py="xl" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '100%' }}>
              <Stack gap="md" align="center">
                <IconAlertCircle size={48} stroke={1.5} style={{ color: 'var(--mantine-color-red-6)' }} />
                <Title order={2}>Something went wrong!</Title>
                <Text c="dimmed" ta="center">
                  {error.message || 'An unexpected error occurred'}
                </Text>
                <Button onClick={reset} variant="filled">
                  Try again
                </Button>
              </Stack>
            </Card>
          </Container>
        </MantineProvider>
      </body>
    </html>
  )
}


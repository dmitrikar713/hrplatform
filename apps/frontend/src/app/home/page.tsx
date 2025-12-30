'use client'

import { useState } from 'react'
import { Button, Card, Alert, Title, Text, Stack, List } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { AuthGuard } from '@/components/AuthGuard'

export default function HomePage() {
  const [healthStatus, setHealthStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function checkBackend() {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3001/users/mock')
      const data = await response.json()
      console.log(data)
      const message = `Юзер имя: ${data.name || 'N/A'}`
      setHealthStatus(message)
      notifications.show({
        title: 'Success',
        message: message,
        color: 'green',
      })
    } catch (error) {
      const errorMessage = 'Backend is not reachable. Make sure it is running on port 3001.'
      setHealthStatus(errorMessage)
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthGuard>
      <Stack gap="md">
        <Title order={1}>HR Platform</Title>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
          }}
        >
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
              <Title order={2}>Welcome</Title>
              <Text c="dimmed">
                This is your HR Platform frontend built with Next.js, TypeScript, and Mantine.
              </Text>
              <Button onClick={checkBackend} loading={loading} fullWidth>
                Получи мок пользователя
              </Button>
              {healthStatus && (
                <Alert
                  color={healthStatus.includes('not reachable') ? 'red' : 'green'}
                  title={healthStatus.includes('not reachable') ? 'Error' : 'Success'}
                >
                  {healthStatus}
                </Alert>
              )}
            </Stack>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
              <Title order={2}>Features</Title>
              <List>
                <List.Item>React with TypeScript</List.Item>
                <List.Item>Next.js 14</List.Item>
                <List.Item>Mantine UI Components</List.Item>
                <List.Item>Tailwind CSS</List.Item>
              </List>
            </Stack>
          </Card>
        </div>
      </Stack>
    </AuthGuard>
  )
}


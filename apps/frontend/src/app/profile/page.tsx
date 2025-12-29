'use client'

import { useEffect, useState } from 'react'
import {
  Container,
  Title,
  Card,
  Stack,
  Text,
  Loader,
  Alert,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { getProfile } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { AuthGuard } from '@/components/AuthGuard'

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const setAuth = useAuthStore((state) => state.setAuth)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      // If user is already in store, don't fetch again
      if (user) {
        setLoading(false)
        return
      }

      try {
        const userData = await getProfile(token)
        setAuth(token, userData)
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to load profile'
        setError(errorMessage)
        notifications.show({
          title: 'Error',
          message: errorMessage,
          color: 'red',
        })
        // If unauthorized, clear auth and redirect
        if (err.message?.includes('Unauthorized') || err.message?.includes('401')) {
          clearAuth()
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [token, user, setAuth, clearAuth])

  if (loading) {
    return (
      <AuthGuard>
        <Container size="sm" py="xl">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md" align="center">
              <Loader size="lg" />
              <Text>Loading profile...</Text>
            </Stack>
          </Card>
        </Container>
      </AuthGuard>
    )
  }

  if (error && !user) {
    return (
      <AuthGuard>
        <Container size="sm" py="xl">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Alert color="red" title="Error">
              {error}
            </Alert>
          </Card>
        </Container>
      </AuthGuard>
    )
  }

  if (!user) {
    return null
  }

  return (
    <AuthGuard>
      <Container size="sm" py="xl">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Title order={2}>Profile</Title>
            <div>
              <Text size="sm" c="dimmed">
                ID
              </Text>
              <Text fw={500}>{user.id}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Email
              </Text>
              <Text fw={500}>{user.email}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Name
              </Text>
              <Text fw={500}>{user.name || 'Not provided'}</Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Created At
              </Text>
              <Text fw={500}>
                {new Date(user.createdAt).toLocaleString()}
              </Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Updated At
              </Text>
              <Text fw={500}>
                {new Date(user.updatedAt).toLocaleString()}
              </Text>
            </div>
          </Stack>
        </Card>
      </Container>
    </AuthGuard>
  )
}


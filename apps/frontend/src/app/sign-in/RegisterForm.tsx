'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Alert,
} from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { register } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

export function RegisterForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const setAuth = useAuthStore((state) => state.setAuth)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!name.trim()) {
      setError('Name is required')
      setLoading(false)
      return
    }

    try {
      const response = await register({ email, name, password })
      setAuth(response.accessToken, response.user)
      notifications.show({
        title: 'Success',
        message: 'Account created and signed in successfully!',
        color: 'green',
      })
      router.push('/home')
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to register'
      setError(errorMessage)
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
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput
          label="Email"
          placeholder="your@email.com"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <TextInput
          label="Name"
          placeholder="Your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        {error && (
          <Alert color="red" title="Error">
            {error}
          </Alert>
        )}
        <Button type="submit" loading={loading} fullWidth>
          Register
        </Button>
      </Stack>
    </form>
  )
}


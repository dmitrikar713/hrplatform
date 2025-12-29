'use client'

import { useState } from 'react'
import { Container, Title, Card, Stack, SegmentedControl } from '@mantine/core'
import { SignInForm } from './SignInForm'
import { RegisterForm } from './RegisterForm'

type AuthMode = 'login' | 'register'

export default function SignInPage() {
  const [mode, setMode] = useState<AuthMode>('login')

  return (
    <Container size="sm" py="xl">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <div>
            <Title order={2} mb="md" ta="center">
              {mode === 'login' ? 'Sign In' : 'Register'}
            </Title>
            <SegmentedControl
              value={mode}
              onChange={(value) => setMode(value as AuthMode)}
              data={[
                { label: 'Sign In', value: 'login' },
                { label: 'Register', value: 'register' },
              ]}
              fullWidth
            />
          </div>
          {mode === 'login' ? <SignInForm /> : <RegisterForm />}
        </Stack>
      </Card>
    </Container>
  )
}

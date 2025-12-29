'use client'

import { useState } from 'react'
import { Button, Card, Alert } from 'flowbite-react'

export default function Home() {
  const [healthStatus, setHealthStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const checkBackend = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3001/health')
      const data = await response.json()
      setHealthStatus(`Backend is ${data.status} - ${data.timestamp}`)
    } catch (error) {
      setHealthStatus('Backend is not reachable. Make sure it is running on port 3001.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          HR Platform
        </h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h2 className="text-2xl font-semibold mb-4">Welcome</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This is your HR Platform frontend built with Next.js, TypeScript, and Flowbite.
            </p>
            <Button onClick={checkBackend} color="blue" disabled={loading}>
              {loading ? 'Checking...' : 'Check Backend'}
            </Button>
            {healthStatus && (
              <Alert color={healthStatus.includes('not reachable') ? 'failure' : 'success'} className="mt-4">
                {healthStatus}
              </Alert>
            )}
          </Card>
          
          <Card>
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>React with TypeScript</li>
              <li>Next.js 14</li>
              <li>Flowbite UI Components</li>
              <li>Tailwind CSS</li>
            </ul>
          </Card>
        </div>
      </div>
    </main>
  )
}


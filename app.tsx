'use client'

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from './auth-context'
import PrivacyImpactAssessmentTool from './privacy-impact-assessment-tool'
import Login from './login'

const queryClient = new QueryClient()

function AppContent() {
  const { user } = useAuth()

  return user ? <PrivacyImpactAssessmentTool /> : <Login />
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  )
}

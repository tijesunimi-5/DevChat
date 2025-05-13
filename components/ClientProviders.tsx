'use client'
// import { SessionProvider } from 'next-auth/react'
import { UserProvider, useUser } from './UserContext'
import Header from './Header'
import { useEffect } from 'react'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  
  return (
      <UserProvider>
        <Header />
        {children}
      </UserProvider>
  )
}

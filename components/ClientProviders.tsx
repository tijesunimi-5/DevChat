'use client'
import { SessionProvider } from 'next-auth/react'
import { UserProvider, useUser } from './UserContext'
import Header from './Header'
import Logged from './Logged'
import { useEffect } from 'react'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  
  return (
    <SessionProvider>
      <UserProvider>
        <Header />
        <Logged />
        {children}
      </UserProvider>
    </SessionProvider>
  )
}

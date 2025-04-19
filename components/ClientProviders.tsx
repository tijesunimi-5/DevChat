'use client'
import { SessionProvider } from 'next-auth/react'
import { UserProvider } from './UserContext'
import Header from './Header'
import Logged from './Logged'

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

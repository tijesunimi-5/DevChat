'use client'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useUser } from './UserContext'

export default function Logged() {
  const { data: session, status } = useSession()
  const { setUser, setSignedIn, setDevInfo } = useUser()

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      console.log('Session User:', session.user)
      const userData = {
        fullname: session.user.name || '',
        email: session.user.email || '',
        password: '',
        firstName: session.user.name?.split(' ')[0] || '',
      }
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      localStorage.setItem('signedIn', 'true')
    } else if (status === 'unauthenticated') {
      localStorage.removeItem('user')
      localStorage.setItem('signedIn', 'false')
      setUser({ fullname: '', email: '', password: '', firstName: '' })
      setDevInfo({ DevField: '', DevStack: [], DevExperience: 0 })
      setSignedIn(false)
    }
  }, [status, session, setUser, setSignedIn, setDevInfo])

  return null
}
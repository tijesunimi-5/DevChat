'use client'
import React, { createContext, useState, useContext, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'

interface User {
  fullname: string
  email: string
  password: string
  firstName?: string
}

interface DevInfo {
  DevField: string
  DevStack: string[]
  DevExperience: number | string
}

interface UserContextProps {
  user: User
  setUser: (user: User) => void
  devInfo: DevInfo
  setDevInfo: React.Dispatch<React.SetStateAction<DevInfo>>
  signedIn: boolean
  setSignedIn: (status: boolean) => void
  isProfileSetupComplete: boolean
  setIsProfileSetupComplete: (status: boolean) => void
  progress: number
  setProgress: React.Dispatch<React.SetStateAction<number>>
  linkUploadProgress: number
  setLinkUploadProgress: React.Dispatch<React.SetStateAction<number>>
  QnAProgress: number
  setQnAProgress: React.Dispatch<React.SetStateAction<number>>
  trainModelProgress: number
  setTrainModelProgress: React.Dispatch<React.SetStateAction<number>>
  logout: () => void
  barVisible: boolean
  setBarVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    fullname: '',
    email: '',
    password: '',
    firstName: '',
  })
  const [devInfo, setDevInfo] = useState<DevInfo>({
    DevField: '',
    DevStack: [],
    DevExperience: 0,
  })
  const [signedIn, setSignedIn] = useState<boolean>(false)
  const [isProfileSetupComplete, setIsProfileSetupComplete] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [linkUploadProgress, setLinkUploadProgress] = useState<number>(0)
  const [QnAProgress, setQnAProgress] = useState<number>(0)
  const [trainModelProgress, setTrainModelProgress] = useState<number>(0)
  const [barVisible, setBarVisible] = useState<boolean>(false)

  // Sync with next-auth session
  const { data: session } = useSession()
  useEffect(() => {
    if (session) {
      setSignedIn(true)
      setUser({
        fullname: session.user?.name || '',
        email: session.user?.email || '',
        password: '',
        firstName: session.user?.name?.split(' ')[0] || '',
      })
      localStorage.setItem(
        'user',
        JSON.stringify({
          fullname: session.user?.name || '',
          email: session.user?.email || '',
          password: '',
          firstName: session.user?.name?.split(' ')[0] || '',
        })
      )
      localStorage.setItem('signedIn', 'true')
      if (localStorage.getItem('devInfo')) {
        setIsProfileSetupComplete(true)
        localStorage.setItem('isProfileSetupComplete', 'true')
      }
    }
  }, [session])

  // Hydrate states from localStorage
  useEffect(() => {
    const hydrateState = () => {
      try {
        const storedUser = localStorage.getItem('user')
        const storedDevInfo = localStorage.getItem('devInfo')
        const storedSignedIn = localStorage.getItem('signedIn')
        const storedIsProfileSetupComplete = localStorage.getItem('isProfileSetupComplete')
        const storedProgress = localStorage.getItem('progress')
        const storedLinkProgress = localStorage.getItem('linkProgress')
        const storedQnA = localStorage.getItem('QnAProgress')
        const storedTrainedProgress = localStorage.getItem('Train-model-progress')
        const storedBarVisibility = localStorage.getItem('bar-visibility')

        if (storedUser) {
          setUser(JSON.parse(storedUser) || { fullname: '', email: '', password: '', firstName: '' })
        }
        if (storedDevInfo) {
          const parsedDevInfo = JSON.parse(storedDevInfo)
          setDevInfo({
            DevField: parsedDevInfo.DevField || '',
            DevStack: Array.isArray(parsedDevInfo.DevStack) ? parsedDevInfo.DevStack : [],
            DevExperience: parsedDevInfo.DevExperience || 0,
          })
        }
        if (storedSignedIn) {
          setSignedIn(storedSignedIn === 'true')
        }
        if (storedIsProfileSetupComplete) {
          setIsProfileSetupComplete(storedIsProfileSetupComplete === 'true')
        }
        if (storedProgress) {
          const parsedProgress = parseInt(storedProgress, 10)
          setProgress(isNaN(parsedProgress) ? 0 : parsedProgress) // Prevent NaN
        }
        if (storedLinkProgress) {
          const parsedLinkProgress = parseInt(storedLinkProgress, 10)
          setLinkUploadProgress(isNaN(parsedLinkProgress) ? 0 : parsedLinkProgress)
        }
        if (storedQnA) {
          const parsedQnA = parseInt(storedQnA, 10)
          setQnAProgress(isNaN(parsedQnA) ? 0 : parsedQnA)
        }
        if (storedTrainedProgress) {
          const parsedTrainedProgress = parseInt(storedTrainedProgress, 10)
          setTrainModelProgress(isNaN(parsedTrainedProgress) ? 0 : parsedTrainedProgress)
        }
        if (storedBarVisibility) {
          setBarVisible(storedBarVisibility === 'true')
        }
      } catch (error) {
        console.error('Error hydrating state from localStorage:', error)
        setUser({ fullname: '', email: '', password: '', firstName: '' })
        setDevInfo({ DevField: '', DevStack: [], DevExperience: 0 })
        setSignedIn(false)
        setIsProfileSetupComplete(false)
        setProgress(0)
        setLinkUploadProgress(0)
        setQnAProgress(0)
        setTrainModelProgress(0)
        setBarVisible(false)
      }
    }
    hydrateState()
  }, [])

  // Persist states to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('devInfo', JSON.stringify(devInfo))
      localStorage.setItem('signedIn', signedIn.toString())
      localStorage.setItem('isProfileSetupComplete', isProfileSetupComplete.toString())
      localStorage.setItem('progress', progress.toString())
      localStorage.setItem('linkProgress', linkUploadProgress.toString())
      localStorage.setItem('QnAProgress', QnAProgress.toString())
      localStorage.setItem('Train-model-progress', trainModelProgress.toString())
      localStorage.setItem('bar-visibility', barVisible.toString())
    } catch (error) {
      console.error('Error persisting state to localStorage:', error)
    }
  }, [user, devInfo, signedIn, isProfileSetupComplete, progress, linkUploadProgress, QnAProgress, trainModelProgress, barVisible])

  const logout = () => {
    signOut({ callbackUrl: '/Registration' })
    setUser({ fullname: '', email: '', password: '', firstName: '' })
    setDevInfo({ DevField: '', DevStack: [], DevExperience: 0 })
    setSignedIn(false)
    setIsProfileSetupComplete(false)
    setProgress(0)
    setLinkUploadProgress(0)
    setQnAProgress(0)
    setTrainModelProgress(0)
    setBarVisible(false)
    localStorage.removeItem('user')
    localStorage.removeItem('devInfo')
    localStorage.removeItem('signedIn')
    localStorage.removeItem('isProfileSetupComplete')
    localStorage.removeItem('progress')
    localStorage.removeItem('linkProgress')
    localStorage.removeItem('dev-projects')
    localStorage.removeItem('dev-more-info')
    localStorage.removeItem('QnAProgress')
    localStorage.removeItem('Train-model-progress')
    localStorage.removeItem('bar-visibility')
    sessionStorage.clear()
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        devInfo,
        setDevInfo,
        signedIn,
        setSignedIn,
        isProfileSetupComplete,
        setIsProfileSetupComplete,
        progress,
        setProgress,
        linkUploadProgress,
        setLinkUploadProgress,
        QnAProgress,
        setQnAProgress,
        trainModelProgress,
        setTrainModelProgress,
        logout,
        barVisible,
        setBarVisible,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider }
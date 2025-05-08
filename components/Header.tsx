'use client'
import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { FaBars } from 'react-icons/fa6'
import MobileBar from './MobileBar'
import Link from 'next/link'
import { useUser } from './UserContext'
import Button from './Button'
import { useRouter } from 'next/navigation'

const Header = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { user, signedIn, logout, setBarVisible, isProfileSetupComplete } = useUser()
  const router = useRouter()

  const toggle = () => {
    const newVisible = !isVisible
    setIsVisible(newVisible)
    setBarVisible(newVisible) // Sync with UserContext
  }

  const Logout = () => {
    logout() // Resets barVisible in UserContext
    setIsVisible(false) // Ensure local state is reset
  }

  const navigate = () => {
    if (signedIn && isProfileSetupComplete) {
      router.push('/home')
      return
    }
    router.push('/')
  }

  return (
    <header className="flex px-3 py-1 fixed right-0 left-0 justify-between items-center border-b border-[#3D3CC9] z-50 md:px-14 lg:px-5 xl:px-14">
      <div className="blur absolute left-0 right-0 bottom-0 top-0 "></div>
      <h1 onClick={navigate} className="text-2xl font-bold z-10 lg:text-[30px] cursor-pointer">
        Dev<span className="text-[#4545d0]">Chat</span>
      </h1>

      {isProfileSetupComplete && (
        <ul className="nav hidden lg:flex lg:justify-between lg:items-center text-white z-40 lg:w-[500px] xl:w-[700px] text-[20px]">
          <Link href="/home">Dashboard</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/trainer">Trainer</Link>
          <Link href="/preview">Preview</Link>
          <Link href="/integration">Integration</Link>
          <Link href="/docs">Docs</Link>
        </ul>
      )}

      {isProfileSetupComplete && (
        <>
          <div className="icon text-2xl flex items-center lg:hidden z-10" onClick={toggle}>
            {isVisible ? (
              <FaTimes className="transition-all duration-300 ease-in-out" />
            ) : (
              <FaBars className="transition-all duration-300 ease-in-out" />
            )}
          </div>
          <MobileBar isVisible={isVisible} setVisible={setIsVisible} />
        </>
      )}

      {isProfileSetupComplete && (
        <Button style="hidden lg:flex lg:h-[35px] lg:my-2" onclick={Logout}>
          Log Out
        </Button>
      )}
    </header>
  )
}

export default Header
'use client'
import gsap from 'gsap'
import React, { useEffect, useState } from 'react'
import Button from './Button'
import { useUser } from './UserContext'
import { FaCog, FaFile, FaFlask, FaHome, FaLink, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'
import Link from 'next/link'

interface MobileBarProps {
  isVisible: boolean;
  setVisible: (visible: boolean) => void
}

const MobileBar = ({ isVisible, setVisible }: MobileBarProps) => {
  const [active, setActive] = useState<null | number>(null)
  const { user, signedIn, logout, setBarVisible } = useUser()

  const capitalizeFirstName = (name?: string) => {
    if (name) {
      const firstName = name.split(' ')[0]
      return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
    }
    return ''
  }
  const firstname = capitalizeFirstName(user.fullname)

  const handleClick = (index: number) => {
    const newVisible = !isVisible
    setActive(index)
    setVisible(newVisible)
    setBarVisible(newVisible) // Sync with UserContext
  }

  useEffect(() => {
    gsap.to('.mobile-bar', {
      marginLeft: isVisible ? 0 : '-300px',
    })
  }, [isVisible])

  const handleLogout = () => {
    logout()
    setVisible(false)
  }

  return (
    <div
      className={`mobile-bar w-[300px] h-screen px-2 shadow lg:hidden border-r-2 border-[#3D3CC9] absolute top-0 bottom-0 left-0 mt-10 overflow-hidden ${isVisible ? 'block' : 'ml-[-300px]'}`}
    >
      <div className="blur absolute top-0 left-0 w-full h-full z-10"></div>
      <div className="flex justify-center flex-col mt-2 z-40">
        <span className="z-40 font-bold text-2xl cursor-pointer pt-3">
          Welcome, {firstname} 👋
        </span>
        <span
          onClick={() => handleClick(0)}
          className={`${active === 0 ? 'text-[#3D3CC9]' : 'text-white'} font-bold text-2xl cursor-pointer mt-3 pt-3 border-b z-40 flex items-center`}
        >
          <Link href="/home" className="flex w-full">
            <FaHome className="text-col mr-3 text-[28px] mb-1" />
            Dashboard
          </Link>
        </span>
        <span
          onClick={() => handleClick(2)}
          className={`${active === 2 ? 'text-[#3D3CC9]' : 'text-white'} font-bold text-2xl cursor-pointer pt-5 border-b z-30 flex items-center`}
        >
          <Link href="/profile" className="flex w-full">
            <FaUser className="text-col mr-3 text-[28px] mb-2" />
            Profile
          </Link>
        </span>
        <span
          onClick={() => handleClick(3)}
          className={`${active === 3 ? 'text-[#3D3CC9]' : 'text-white'} font-bold text-2xl cursor-pointer pt-5 border-b z-30 flex items-center`}
        >
          <Link href="/trainer" className="flex w-full">
            <FaMessage className="text-col mr-3 text-[28px]" />
            DevChat trainer
          </Link>
        </span>
        <span
          onClick={() => handleClick(4)}
          className={`${active === 4 ? 'text-[#3D3CC9]' : 'text-white'} font-bold text-2xl cursor-pointer pt-5 border-b z-30 flex items-center`}
        >
          <Link href="/preview" className="flex">
            <FaFlask className="text-col mr-3 text-[28px] mb-1.5" />
            Preview chatbot
          </Link>
        </span>
        <span
          onClick={() => handleClick(5)}
          className={`${active === 5 ? 'text-[#3D3CC9]' : 'text-white'} font-bold text-2xl cursor-pointer pt-5 border-b z-30 flex items-center`}
        >
          <Link href="#" className="flex">
            <FaLink className="text-col mr-3 text-[28px] mb-1" />
            Integration
          </Link>
        </span>
        <span
          onClick={() => handleClick(6)}
          className={`${active === 6 ? 'text-[#3D3CC9]' : 'text-white'} font-bold text-2xl cursor-pointer pt-5 border-b z-30 flex items-center`}
        >
          <Link href="#" className="flex">
            <FaFile className="text-col mr-3 text-[28px] mb-1.5" />
            Documentation
          </Link>
        </span>
        <Button style="absolute bottom-20 w-[280px] text-[20px] z-50" onclick={handleLogout}>
          {signedIn ? (
            <>
              Sign Out <FaSignOutAlt className="ml-3" />
            </>
          ) : (
            <>
              Sign In <FaSignInAlt className="ml-3" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default MobileBar
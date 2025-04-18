'use client'
import gsap from 'gsap'
import React, { useEffect, useState } from 'react'
import Button from './Button'
import { useUser } from './UserContext'
import { FaCog, FaFile, FaFlask, FaHome, FaLink, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'
import Link from 'next/link'

const MobileBar = ({ isVisible, setVisible }: any | boolean) => {
  const [active, setActive] = useState<null | number>(null)
  const { user, signedIn } = useUser()
  const capitalLetter = (firstname?: string) => {
    if (firstname && firstname[0] === firstname[0].toLowerCase()) {
      return firstname.charAt(0).toUpperCase() + firstname.slice(1)
    }
  }
  const firstname = capitalLetter(user.firstName)

  const handleClick = (index: number) => {
    setActive(index)
  }

  useEffect(() => {
    if (isVisible) {
      gsap.to('.mobile-bar', {
        marginLeft: 0
      })
    } if (!isVisible) {
      gsap.to('.mobile-bar', {
        marginLeft: '-300px'
      })
    }
  })

  return (
    <div className={`mobile-bar w-[300px] h-screen px-2 shadow md:hidden border-r-2 border-[#3D3CC9] absolute top-0 bottom-0 left-0 ${isVisible ? 'block' : 'ml-[-300px]'} mt-10 overflow-hidden`}>
      <div className="blur absolute top-0 left-0 w-full h-full z-10"></div>
      <div className={`flex justify-center flex-col mt-2 z-40`}>
        <span className='z-40 font-bold text-2xl cursor-pointer pt-3  '>
          Welcome, {firstname} 👋
        </span>
        <span
          onClick={() => { handleClick(0); setTimeout(() => { setVisible(false) }, 200) }}
          className={`${active === 0 ? 'text-[#3D3CC9]' : 'text-white'} font-bold text-2xl cursor-pointer mt-3 pt-3 border-b z-40 flex items-center`}>
          <Link href={'/home'} className='flex w-full'>
            <FaHome className='text-col mr-3 text-[28px] mb-1' />
            Dashboard
          </Link>
        </span>

        <span onClick={() => { handleClick(2); setTimeout(() => { setVisible(false) }, 200) }} className={`${active === 2 ? 'text-[#3D3CC9]' : 'text-white'} font-bold text-2xl cursor-pointer pt-5 border-b z-30 flex items-center`}>
          <Link href={'/profile'} className='flex w-full'>
            <FaUser className='text-col mr-3 text-[28px] mb-2' />
            Profile
          </Link>
        </span>

        <span onClick={() => { handleClick(3); setTimeout(() => { setVisible(false) }, 200) }} className={`${active === 3 ? 'text-[#3D3CC9]' : 'text-white'} font-bold text-2xl cursor-pointer pt-5 border-b z-30 flex items-center`}>
          <Link href={'/trainer'} className='flex w-full'>
            <FaMessage className='text-col mr-3 text-[28px]' />
            DevChat trainer
          </Link>
        </span>

        <span onClick={() => { handleClick(4); setTimeout(() => { setVisible(false) }, 200) }} className={`${active === 4 ? 'text-[#3D3CC9]' : 'text-white'} font-bold text-2xl cursor-pointer pt-5 border-b z-30 flex items-center`}>
          <Link href={'/preview'} className='flex'>
            <FaFlask className='text-col mr-3 text-[28px] mb-1.5' />
            Preview chatbot
          </Link>
        </span>

        <span onClick={() => { handleClick(5); setTimeout(() => { setVisible(false) }, 200) }} className={`${active === 5 ? 'text-[#3D3CC9]' : 'text-white'} font-bold text-2xl cursor-pointer pt-5 border-b z-30 flex items-center`}>
          <FaLink className='text-col mr-3 text-[28px] mb-1' /> Integration
        </span>

        <span onClick={() => { handleClick(6); setTimeout(() => { setVisible(false) }, 200) }} className={`${active === 6 ? 'text-[#3D3CC9]' : 'text-white'} font-bold text-2xl cursor-pointer pt-5 border-b z-30 flex items-center`}>
          <FaFile className='text-col mr-3 text-[28px] mb-1.5' /> Documentation
        </span>

        <span onClick={() => { handleClick(7); setTimeout(() => { setVisible(false) }, 200) }} className={`${active === 7 ? 'text-[#3D3CC9]' : 'text-white'} font-bold text-2xl cursor-pointer pt-5 border-b z-30 flex items-center`}>
          <FaCog className='text-col mr-3 text-[28px] mb-1.5' /> Settings
        </span>

        <Button style='absolute bottom-20 w-[280px] text-[20px]'>{signedIn ? (<> Sign Out <FaSignOutAlt className='ml-3' />  </>) : (<><FaSignInAlt className='ml-3' /> Sign In</>)}</Button>
      </div>
    </div>
  )
}

export default MobileBar

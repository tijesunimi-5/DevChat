'use client'
import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { FaBars } from 'react-icons/fa6'
import MobileBar from './MobileBar'

const Header = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false) //this state toggles the menu for mobile
  
  return (
    <header className='flex px-3 py-1 fixed right-0 left-0 justify-between items-center border-b border-[#3D3CC9] z-50'>
      <div className="blur absolute left-0 right-0 bottom-0 top-0"></div>
      <h1 className='text-2xl font-bold  z-10'>Dev<span className='text-[#4545d0]'>Chat</span></h1>

      <div className="nav hidden">

      </div>

      <div className="icon text-2xl flex items-center md:hidden  z-10" onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? <FaTimes className='transition-all duration-300 ease-in-out' /> : <FaBars className='transition-all duration-300 ease-in-out' />}
      </div>
      <MobileBar isVisible={isVisible} setVisible={setIsVisible} />
    </header>
  )
}

export default Header

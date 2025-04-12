'use client'
import gsap from 'gsap'
import React, { useEffect, useState } from 'react'
import Button from './Button'

const MobileBar = ({isVisible, setVisible}: any | boolean) => {
  const [active, setActive] = useState<null | number>(null)

  const handleClick = (index: number) => {
    setActive(index)
  }

  useEffect(() => {
    if(isVisible) {
      gsap.to('.mobile-bar', {
        marginLeft: 0
      })
    } if(!isVisible) {
      gsap.to('.mobile-bar', {
        marginLeft: '-300px'
      })
    }
  })

  return (
    <div className={`mobile-bar w-[300px] h-screen px-2 shadow md:hidden border-r-2 border-[#3D3CC9] absolute top-0 bottom-0 left-0 ${isVisible ? 'block' : 'ml-[-300px]'} mt-10 overflow-hidden`}>
      <div className="blur absolute top-0 left-0 w-full h-full z-10"></div>
      <div className={`flex justify-center flex-col mt-2 z-40`}>
        <span onClick={() => {handleClick(0); setTimeout(() => {setVisible(false)}, 200)}} className={`${active === 0 ? 'text-[#3D3CC9]' : 'text-white'} font-bold text-2xl cursor-pointer pt-3 border-b z-40`}>
          Profile
        </span>
        <span onClick={() => {handleClick(1); setTimeout(() => {setVisible(false)}, 200)}} className={`${active === 1? 'text-[#3D3CC9]' : 'text-white'} font-bold text-2xl cursor-pointer pt-5 border-b z-30`}>
          AI-Model
        </span>
        <span onClick={() => {handleClick(2); setTimeout(() => {setVisible(false)}, 200)}} className={`${active === 2? 'text-[#3D3CC9]' : 'text-white'} font-bold text-2xl cursor-pointer pt-5 border-b z-30`}>
          Settings
        </span>
        <span onClick={() => {handleClick(3); setTimeout(() => {setVisible(false)}, 200)}} className={`${active === 3? 'text-[#3D3CC9]' : 'text-white'} font-bold text-2xl cursor-pointer pt-5 border-b z-30`}>
          Documentation
        </span>

        <Button style='absolute bottom-20 w-[280px]'>Login</Button>
      </div>
    </div>
  )
}

export default MobileBar

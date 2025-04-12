'use client'
import React, { CSSProperties, ReactNode } from 'react'

type ButtonProps = {
    style?: string
    children: ReactNode
    onclick?: () => void
  }

const Button = ({style, children, onclick}: ButtonProps) => {
  
  return (
    <button onClick={onclick} className={`${style} rounded text-white font-bold text-lg flex items-center justify-center px-5 py-2 bg-[#3D3CC9] hover:bg-[#3D3CC9] transition-all duration-300 ease-in-out z-30`}>
      {children}
    </button>
  )
}

export default Button

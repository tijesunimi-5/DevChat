'use client'
import React from 'react'

type message = {
  msg?: string
}

const Alert = ({ msg }: message) => {

  return (
    <div className='absolute flex justify-center items-center top-[6%] w-full blur-effect z-30  left-0'>
      {/* <div className="blur w-full h-full absolute"></div> */}
      <p className="message z-40 text-[22px] text-center px-2 py-2">{msg}</p>
    </div>
  )
}

export default Alert

'use client'
import React from 'react'

type message = {
  msg?: string
}

const Alert = ({ msg }: message) => {

  return (
    <div className='absolute flex top-[30%] w-[300px] h-[280px] z-30 rounded-2xl left-10'>
      <div className="blur w-full h-full absolute"></div>
      <div className="content z-20 pt-2 w-full h-full flex flex-col">
        <h1 className='z-20 text-3xl font-bold text-center'>Alert</h1>

        <p>✅</p>

        <p className="message z-20 text-[24px] text-center mt-24">{msg}</p>
      </div>
    </div>
  )
}

export default Alert

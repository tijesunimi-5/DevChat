'use client'
import ChatWidget from '@/components/ChatWidget'
import { useUser } from '@/components/UserContext'
import React from 'react'

const page = () => {
  const {barVisible} = useUser()
  return (
    <div className='relative'>
      {barVisible && (<div className={`blur absolute top-0 right-0 left-0 bottom-0`}></div>)}
      <ChatWidget />
    </div>
  )
}

export default page

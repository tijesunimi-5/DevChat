'use client'
import React, { useEffect, useRef, useState } from 'react'
import { FaMessage } from 'react-icons/fa6'

const Loader = () => {
  //this is the text that is displayed when loading...
  const text: string[] = [
    'Unlock the power of AI: Elevate your portfolio with intelligent chatbots.',
    'Effortlessly showcase your expertise with AI-Powered chatbots.',
    'Stand out with AI-Driven chatbots that answer questions about you.',
    'Revolutionize your portfolio: AI-Driven chatbots for instant answers.'
  ]
  const [currentText, setCurrentText] = useState<string>(text[0])
  const [opacity, setOpacity] = useState<boolean>(false)
  const textDisplayRef = useRef<HTMLDivElement>(null)
  let index: number = 0

  //this setts the time for each texts
  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(false)
      setTimeout(() => {
        const nextIndex = (text.indexOf(currentText) + 1) % text.length;
        setCurrentText(text[nextIndex])
        setOpacity(true)
      }, 1000)
    }, 2000)

    return () => clearInterval(interval)
  }, [currentText])

  return (
    <div className='w-screen h-screen flex justify-center flex-col items-center z-40 relative'>

      <div className='flex flex-col items-center md:mt-[-50px] relative loader-div'>

        <FaMessage className='text-7xl mt-[-100px] text-[#3D3CC9]' />

        <h1 className='text-3xl font-bold tracking-wider mb-5'>
          Dev
          <span className='text-[#3D3CC9]'>
            Chat
          </span>
        </h1>

        <div
          className='w-[300px] bg-black rounded-3xl h-2 overflow-hidden flex mb-5 absolute bottom-[-30px] md:bottom-[-50px]'>
          <span className='w-[50px] rounded-2xl bg-white h-2 loader'></span>
        </div>

        <p
          ref={textDisplayRef}
          className={`absolute bottom-[-80px] w-[350px] md:bottom-[-100px] md:w-[400px] ${opacity ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000  text-display text-center`}>
          {currentText}
        </p>
      </div>
    </div>
  )
}

export default Loader

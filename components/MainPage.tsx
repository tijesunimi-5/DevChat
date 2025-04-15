'use client'
import React, { useState } from 'react'
import { useUser } from './UserContext'
import CircularProgress from './CircularProgress'
import Link from 'next/link'

const MainPage: React.FC = () => {
  const { user } = useUser()
  const [percentage, setPercentage] = useState<number>(50)
  const capitalLetter = (firstname?: string) => {
    if (firstname && firstname[0] === firstname[0].toLowerCase()) {
      return firstname.charAt(0).toUpperCase() + firstname.slice(1)
    }
  }
  const firstname = capitalLetter(user.firstName)

  return (
    <div className='pt-10 px-3'>
      <div className="welcome text-xl mt-5 font-bold">Welcome, {firstname} 👋</div>
      <div className='mt-5 px-2 py-3 rounded regShad flex justify-between'>
        <div className='flex flex-col'>
          <p className='text-[18px]'>You're {percentage}% set for your model</p>

          <div className="next-step text-gray-400">
            Your next step: <br />
            • Link your social hand handle links
          </div>

          <p className="underline text-col font-bold tracking-wide">Complete next step</p>
        </div>
        <CircularProgress percentage={percentage} />
      </div>

      <div className="steps mt-5 flex flex-col">
        <h1 className='text-center text-3xl font-bold'>Steps</h1>
        <div className='flex mt-5'>
          <div className="creation flex flex-col regShad justify-center items-center w-[400px] rounded-xl">
            <h2 className='text-[18px] pt-2'>Create an account</h2>
            <CircularProgress percentage={100} />
          </div>

          <div className="creation flex flex-col regShad justify-center items-center w-[400px] ml-5 rounded-xl relative">
            <h2 className='pt-2 text-[18px] text-center'>Choose your tech stack</h2>
            <CircularProgress percentage={100} />
            <p className='absolute bottom-0.5 right-2 text-gray-400'>10%</p>
          </div>
        </div>

        <div className='flex mt-8'>
          <div className="creation flex flex-col regShad justify-center items-center w-[400px] rounded-xl relative pb-6">
            <h2 className='text-[18px] pt-2 text-center'>Upload your links...</h2>
            <CircularProgress percentage={0} />
            <p className='text-[#3D3CC9] underline absolute bottom-1 left-2'>complete now</p>
            <p className='absolute bottom-0.5 right-2 text-gray-400'>20%</p>
          </div>

          <div className="creation flex flex-col regShad justify-center items-center w-[400px] ml-5 rounded-xl relative pb-6">
            <h2 className='pt-2 text-[18px]'>Basic QnA</h2>
            <CircularProgress percentage={0} />
            <p className='text-[#3D3CC9] underline absolute bottom-1 left-2'>complete now</p>
            <p className='absolute bottom-0.5 right-2 text-gray-400'>20%</p>
          </div>
        </div>

        <div className="creation flex flex-col regShad justify-center items-center w-[300px] mt-8 ml-5 rounded-xl relative pb-6">
          <h2 className='pt-2 text-[18px]'>Train the chatbot model</h2>
          <CircularProgress percentage={10} />
          <p className='text-[#3D3CC9] underline absolute bottom-1 left-2'>complete now</p>
          <p className='absolute bottom-0.5 right-2 text-gray-400'>50%</p>
        </div>

        <div className="analytics mt-7">
          <h1 className='text-3xl font-bold text-center mb-3'>Anayltics</h1>
          <CircularProgress percentage={0} />
        </div>
      </div>

      <div className="info mt-10">
        <h1 className='text-3xl font-bold text-[#3D3CC9] mb-2'>Overview</h1>
        <p className='leading-normal text-[18px]'>DevChat is an AI-powered chatbot platform designed to help developers revolutionalize their portfolio. With DevChat, you can easily crete and train a chatbot to engage with recruiters, answer common questions, and showcase your skills and projects - all from one platform.</p>

        <h2 className='mt-5 text-[#3D3CC9] font-semibold text-[26px] mb-2'>Key features</h2>
        <ul className='list-disc ml-4 leading-relaxed text-[18px]'>
          <li>Easily set up your chatbot.</li>
          <li>Train your model with your specific content.</li>
          <li>Improve your chances of standing out to potential employers with a smart responsive chatbot.</li>
        </ul>

        <p className='mt-4 pb-4 text-[18px]'>For a step-by-step guide and detailed instructions, visit out <Link href={'/documentation'} className='underline text-[#3D3CC9]'>Documentation</Link></p>
      </div>
    </div>
  )
}

export default MainPage

'use client'
import React, { useState } from 'react'
import { useUser } from './UserContext'
import CircularProgress from './CircularProgress'

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
          <p>You're {percentage}% set for your model</p>

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
    </div>
  )
}

export default MainPage

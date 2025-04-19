'use client'
import React, { useEffect, useState } from 'react'
import { useUser } from './UserContext'
import CircularProgress from './CircularProgress'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const MainPage: React.FC = () => {
  const { user, progress, setProgress, signedIn, linkUploadProgress, QnAProgress,setSignedIn } = useUser()
  const [registerProgress, setRegisterProgress] = useState<number>(0)
  const [techStackProgress, setTechStackProgress] = useState<number>(0)
  const [bQAProgress, setBQProgress] = useState<number>(0)//for basic QnA


  // const capitalizeFullnameFirstLetters = (name?: string) => {
  //   if (name) {
  //     return name
  //       .split(' ') // Split the name by spaces
  //       .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
  //       .join(' '); // Join the words back together with a space
  //   }
  //   return '';
  // };

  // const fullname = capitalizeFullnameFirstLetters(user.fullname);
  useEffect(() => { 
    setSignedIn(true)
  })

  const capitalizeFirstName = (name?: string) => {
    if (name) {
      const firstName = name.split(' ')[0]; // Get the first name
      return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(); // Capitalize the first letter of the first name
    }
    return '';
  };

  const firstname = capitalizeFirstName(user.fullname);


  useEffect(() => {
    if (window.innerWidth <= 375) {
      gsap.to('.cover',
        { width: 0, duration: 5 }
      )
      gsap.fromTo('.fade-txt',
        { opacity: 0 },
        { opacity: 1, duration: 3, delay: 1 }
      )
      gsap.fromTo('.fade-txt2',
        { marginLeft: '-100px', opacity: 0 },
        { marginLeft: 0, opacity: 1, duration: 2 }
      )
      gsap.fromTo('.fade',
        { opacity: 0 },
        { opacity: 1, duration: 6 }
      )
      gsap.fromTo('.scale',
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, }
      )
      gsap.fromTo('.scale2',
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, delay: 0.5 }
      )
      gsap.fromTo('.scale3',
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, delay: 1 }
      )
      gsap.fromTo('.scale4',
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, delay: 1.5 }
      )
      gsap.to('.scroll', {
        scale: 1,
        opacity: 1,
        duration: 2,
        scrollTrigger: {
          trigger: '.scroll',
          start: 'top 90%',
          end: 'top 60%',
          scrub: 2
        }
      }
      )
    }

    if (user && signedIn) {
      setRegisterProgress(100)
      setTechStackProgress(100)
      setProgress(20)
    }
  }, [user, signedIn])



  return (
    <div className='pt-10 px-3'>
      <div className="welcome text-xl mt-5 font-bold relative">
        Welcome, {firstname} 👋
        <span className='bg-[#0a0a0a] cover absolute w-full h-full right-0'></span>
      </div>
      <div className='mt-5 px-2 py-3 rounded regShad flex justify-between overflow-hidden'>
        <div className='flex flex-col'>
          <p className='text-[18px] fade-txt2'>You're {progress}% set for your model</p>

          <div className="next-step text-gray-400 fade-txt">
            Your next step: <br />
            • Link your social hand handle links
          </div>

          <p className="underline text-col font-bold tracking-wide fade">Complete next step</p>
        </div>
        <CircularProgress percentage={progress} />
      </div>

      <div className="steps mt-5 flex flex-col">
        <h1 className='text-center text-3xl font-bold'>Steps</h1>
        <div className='flex mt-5'>
          <div className="creation flex flex-col regShad justify-center items-center w-[400px] rounded-xl scale">
            <h2 className='text-[18px] pt-2'>Create an account</h2>
            <CircularProgress percentage={registerProgress} />
          </div>

          <div className="creation flex flex-col regShad justify-center items-center w-[400px] ml-5 rounded-xl relative scale2">
            <h2 className='pt-2 text-[18px] text-center'>Choose your tech stack</h2>
            <CircularProgress percentage={techStackProgress} />
            <p className='absolute bottom-0.5 right-2 text-gray-400'>10%</p>
          </div>
        </div>

        <div className='flex mt-8'>
          <div className="creation flex flex-col regShad justify-center items-center w-[400px] rounded-xl relative pb-6 scale3">
            <h2 className='text-[18px] pt-2 text-center'>Upload your links...</h2>
            <CircularProgress percentage={linkUploadProgress} />
            {linkUploadProgress < 100
              ? (
                <Link href={'/trainer'} className='text-col underline absolute bottom-1 left-2'>
                  complete now
                </Link>
              ) : (
                <p className='text-col absolute bottom-1 left-2'>
                  Completed
                </p>)}
            <p className='absolute bottom-0.5 right-2 text-gray-400'>10%</p>
          </div>

          <div className="creation flex flex-col regShad justify-center items-center w-[400px] ml-5 rounded-xl relative pb-6 scale4">
            <h2 className='pt-2 text-[18px]'>Basic QnA</h2>
            <CircularProgress percentage={QnAProgress} />
            {QnAProgress < 100
              ? (
                <Link href={'/trainer'} className='text-col underline absolute bottom-1 left-2'>
                  complete now
                </Link>
              ) : (
                <p className='text-col absolute bottom-1 left-2'>
                  Completed
                </p>)}
            <p className='absolute bottom-0.5 right-2 text-gray-400'>20%</p>
          </div>
        </div>

        <div className="creation flex flex-col regShad justify-center items-center w-[300px] mt-8 ml-5 rounded-xl relative pb-6 scroll scale-[0.7]">
          <h2 className='pt-2 text-[18px]'>Train the chatbot model</h2>
          <CircularProgress percentage={10} />
          <p className='text-col underline absolute bottom-1 left-2'>complete now</p>
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

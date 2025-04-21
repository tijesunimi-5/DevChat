'use client'
import Button from '@/components/Button'
import { useUser } from '@/components/UserContext'
import React, { useEffect } from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import { motion } from 'framer-motion'
import Registration from '@/components/Registration'

const page = () => {
  const { user } = useUser()
  const capitalLetter = (firstname?: string) => {
    if (firstname && firstname[0] === firstname[0].toLowerCase()) {
      return firstname.charAt(0).toUpperCase() + firstname.slice(1)
    }
  }
  const firstname = capitalLetter(user.firstName)
  const {signedIn} = useUser()

  useEffect(() => {
    if (window.innerWidth <= 375) {
      // gsap.to('.scale', {
      //   opacity: 1,
      //   scale: 1,
      //   duration: 2,
      //   scrollTrigger: {
      //     trigger: '.scale',
      //     start: 'top '
      //   }
      // })
    }
  }, [])

  if (!signedIn) return <Registration />
  return (
    <div className='pt-12 px-3'>
      <div className="devProfile">
        <h1 className='text-3xl font-bold tracking-wide ml-3'>Dev• {firstname}</h1>

        <motion.div initial={{
          opacity: 0,
          scale: 0.7
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 2,
          staggerChildren: 0.3
        }} className="devStack regShad px-2 py-4 mt-4 relative scale">
          <div className="field text-2xl font-bold tracking-wide leading-relaxed mb-2 mt-[-8px]">Frontend developer</div>

          <div className="stack mx-3 ">
            <ul className='grid grid-cols-3 leading-relaxed pb-3'>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>React</li>
              <li>Next</li>
              <li>TailwindCss</li>
              <li>Gsap</li>
            </ul>
            <Button style='text-[16px] w-[140px] h-[25px] absolute bottom-1 right-1'>Add more+</Button>
          </div>
        </motion.div>

        <motion.div initial={{
          opacity: 0,
          scale: 0.7
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 2,
          delay: 1,
        }} className="social-links regShad mt-10 py-4 px-3 relative">
          <ul className='leading-relaxed text-[18px]'>
            <li className='flex items-center'><FaGithub className='mr-2' /> link.com</li>
            <li className='flex items-center'><FaTwitter className='mr-2' /> link.com</li>
            <li className='flex items-center'><FaLinkedin className='mr-2' /> link.com</li>
          </ul>
          <Button style='text-[16px] w-[140px] h-[25px] absolute bottom-1 right-1'>
            Add more+
          </Button>
        </motion.div>

        <div className="about mt-8 ">
          <motion.h1 initial={{
            marginLeft: '-150px',
            opacity: 0
          }} animate={{
            marginLeft: 0,
            opacity: 1
          }} transition={{
            duration: 2,
            delay: 2
          }} className='font-bold tracking-wide text-2xl'>About Me</motion.h1>
          <p className='text-[18px] leading-relaxed'>kkk</p>
        </div>
      </div>
    </div>
  )
}

export default page

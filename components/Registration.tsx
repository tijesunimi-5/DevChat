'use client'
import React, { useRef, FormEvent, useEffect } from 'react'
import Button from './Button'
import Link from 'next/link';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const Registration = () => {
  const [progress, setProgress] = React.useState<number>(5);
  const [firstname, setFirstname] = React.useState<string>('')
  const [lastname, setLastname] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [tag, setTag] = React.useState<string>('')

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!firstname || !lastname || !email || !password) {
      console.log('empty')
      return
    }

    console.log({ firstname, lastname, email, password })
    increaseProgress()
  }

  useEffect(() => { 
    setTimeout(() => { 
      setTag('Sign Up')
    }, 1000)
    setTag('Account SetUp')
  })

  const increaseProgress = () => {
    // setProgress(progress + 10)
    setProgress(prev => Math.min(prev + 10, 100));
    console.log(progress)
  }

  return (
    <div className='pt-12 px-2 relative pb-8'>
      <h1 className='text-2xl font-bold uppercase text-center mt-7'>{tag}</h1>

      <form className='mt-5 rounded-2xl regShad p-5 overflow-hidden relative flex flex-col justify-between' onSubmit={handleSubmit}>
        <div className="progess h-2 absolute top-0 left-0 right-0  rounded-2xl w-full">
          <span className={`bg-[#3D3C99] absolute h-2 rounded-2xl`} style={{width : `${progress}%`}}></span>
        </div>
        <div className="inputbox mt-2">
          <input required type="text" onChange={(e) => setFirstname(e.target.value)} value={firstname} />
          <span>Firstname</span>
          <i></i>
        </div>

        <div className="inputbox mt-5">
          <input required type="text" onChange={(e) => setLastname(e.target.value)} value={lastname} />
          <span>Lastname</span>
          <i></i>
        </div>

        <div className="inputbox mt-5">
          <input required type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
          <span>Email</span>
          <i></i>
        </div>

        <div className="inputbox mt-5">
          <input required type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
          <span>Password</span>
          <i></i>
        </div>

        <button type='submit' onClick={undefined} className={'bg-[#3D3C99] mt-6 rounded font-bold tracking-wider text-xl py-2 z-20'}>
            Sign Up
        </button>

        <p className='mt-3 z-20'>Have an account already? <Link href={'/'} className='cursor-pointer underline'>Login</Link></p>
      </form>

      <h2 className='text-2xl font-bold text-center mt-3'>Or</h2>

      <div className="optional mt-2 ml-16">
        <Button><FaGoogle className='mr-2' /> Sign up with Google</Button>
        <Button style='mt-2'><FaGithub className='mr-3' /> Sign up with Github </Button>
      </div>
    </div>
  )
}

export default Registration

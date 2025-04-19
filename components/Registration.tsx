'use client'
import React, { useRef, FormEvent, useEffect, useContext, useState } from 'react'
import Button from './Button'
import Link from 'next/link';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Alert from './Alert';
import { useUser } from './UserContext';
import { signIn } from 'next-auth/react';


const Registration = () => {
  const [progress, setProgress] = React.useState<number>(15);
  const [fullname, setFullname] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [message, setMessage] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const [alert, setAlert] = useState<boolean>(false)
  const router = useRouter()
  const { user, setUser } = useUser()



  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if (!fullname || !email || !password) {
      setMessage('Please fill out the fields!')
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 1500)
      return
    }

    const firstName = fullname.trim().split(' ')[0]
    setUser({ fullname, email, password, firstName })
    increaseProgress()
    setMessage('Account created successfully...')
    setAlert(true)
    setTimeout(() => {
      setLoading(false);
      setAlert(false)
    }, 2000)
    setTimeout(() => {
      router.push('/Registration/login')
    }, 3000)
  }

  const increaseProgress = () => {
    setProgress(prev => Math.min(prev + 25, 100));
    console.log(progress)
  }

  return (
    <div className='pt-12 px-2 relative pb-8'>
      <h1 className='text-2xl font-bold uppercase text-center mt-7'>Sign Up</h1>

      <form className='mt-5 rounded-2xl regShad p-5 overflow-hidden relative flex flex-col justify-between' onSubmit={handleSubmit}>
        <div className="progess h-2 absolute top-0 left-0 right-0  rounded-2xl w-full">
          <span className={`bg-[#3D3C99] absolute h-2 rounded-2xl`} style={{ width: `${progress}%` }}></span>
        </div>
        <div className="inputbox mt-2">
          <input required type="text" onChange={(e) => setFullname(e.target.value)} value={fullname} />
          <span>Full name</span>
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

        <Button types='submit' style={'bg-[#3D3C99] mt-6 rounded font-bold tracking-wider text-xl py-2 z-20'}>
          {loading ? 'Creating...' : 'Sign Up'}
        </Button>

        <p className='mt-3 z-20'>Have an account already? <Link href={'/Registration/login'} className='cursor-pointer underline'>Sign In</Link></p>
      </form>

      <h2 className='text-2xl font-bold text-center mt-3'>Or</h2>

      <div className="optional mt-2 ml-16">
        <Button onclick={() => signIn('google', { callbackUrl: '/Registration/profileSetup' })}>
          <FaGoogle className='mr-2' />
          Sign up with Google
        </Button>
        <Button style='mt-2' onclick={() => signIn('github', { callbackUrl: '/Registration/profileSetup' })}>
          <FaGithub className='mr-3' />
          Sign up with Github
        </Button>
      </div>

      {alert && (<Alert msg={message} />)}
    </div>
  )
}

export default Registration

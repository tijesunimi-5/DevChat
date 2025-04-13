'use client'
import Button from '@/components/Button'
import React, { FormEvent } from 'react'
import Link from 'next/link'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import Alert from '@/components/Alert'
import { useRouter } from 'next/navigation'

const page = () => {
  const [progress, setProgress] = React.useState<number>(50);
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [message, setMessage] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if (!email || !password) {
      console.log('empty')
      return
    }

    console.log({ email, password })
    increaseProgress()
    setMessage('Sign In successful')
    setTimeout(() => {
      setLoading(false)
    }, 5000)
    setTimeout(() => {
      router.push('/Registration/profileSetup')
    }, 6000)
  }

  const increaseProgress = () => {
    setProgress(prev => Math.min(prev + 25, 100));
    console.log(progress)
  }

  return (
    <div className='pt-12 px-2 relative pb-8'>
      <h1 className='text-2xl font-bold uppercase text-center mt-5'>Sign In</h1>

      <form onSubmit={handleSubmit} className='mt-5 rounded-2xl regShad p-5 overflow-hidden relative flex flex-col justify-between' >
        <div className="progess h-2 absolute top-0 left-0 right-0  rounded-2xl w-full">
          <span className={`bg-[#3D3C99] absolute h-2 rounded-2xl transition-all duration-200 ease-in-out`} style={{ width: `${progress}%` }}></span>
        </div>

        <div className="inputbox mt-2">
          <input required type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
          <span>Email</span>
          <i></i>
        </div>

        <div className="inputbox mt-5">
          <input required type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
          <span>Password</span>
          <i></i>
        </div>

        <Link href={'/'} className='mt-3 text-gray-400'>Forgot Password?</Link>

        <Button types='submit' style={'bg-[#3D3C99] mt-6 rounded font-bold tracking-wider text-xl py-2 z-20'}>
          Sign In
        </Button>

        <p className='mt-3 z-20'>Don't an account? <Link href={'/Registration'} className='cursor-pointer underline'>Sign Up</Link></p>
      </form>

      <h2 className='text-2xl font-bold text-center mt-7'>Or</h2>

      <div className="optional mt-5 ml-16">
        <Button><FaGoogle className='mr-2' /> Sign up with Google</Button>
        <Button style='mt-4'><FaGithub className='mr-3' /> Sign up with Github </Button>
      </div>

      {loading && (<Alert msg={message} />)}
    </div>
  )
}

export default page

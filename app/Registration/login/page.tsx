'use client'
import React, { FormEvent, useEffect, useState } from 'react'
import Button from '../../../components/Button'
import Link from 'next/link'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Alert from '../../../components/Alert'
import { useUser } from '../../../components/UserContext'
import { signIn } from 'next-auth/react'

const Login = () => {
  const [progress, setProgress] = useState<number>(15)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [alert, setAlert] = useState<boolean>(false)
  const router = useRouter()
  const { setSignedIn, setLinkUploadProgress, isProfileSetupComplete } = useUser()

  useEffect(() => {
    if (isProfileSetupComplete) {
      router.push('/home')
    }
    if (!localStorage.getItem('user')) {
      setLinkUploadProgress(0)
      localStorage.removeItem('dev-projects')
      localStorage.removeItem('dev-more-info')
    }
  }, [isProfileSetupComplete, setLinkUploadProgress, router])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if (!email || !password) {
      setMessage('Please fill out all fields')
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
        setLoading(false)
      }, 1500)
      return
    }

    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      setMessage('No account found. Please sign up.')
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
        setLoading(false)
      }, 1500)
      return
    }

    const parsedUser = JSON.parse(storedUser)
    if (email !== parsedUser.email || password !== parsedUser.password) {
      setMessage('Invalid email or password')
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
        setLoading(false)
      }, 1500)
      return
    }

    setSignedIn(true)
    localStorage.setItem('signedIn', 'true')
    setProgress((prev) => Math.min(prev + 25, 100))
    setMessage('Login successful')
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
      setLoading(false)
      router.push(isProfileSetupComplete ? '/home' : '/Registration/profileSetup')
    }, 1500)
  }

  return (
    <div className="md:w-full md:flex md:justify-center">
      <div className="pt-12 px-2 relative pb-8 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold uppercase text-center mt-7">Sign In</h1>
        <form
          className="mt-5 rounded-2xl regShad p-5 overflow-hidden relative flex flex-col justify-between md:w-[500px]"
          onSubmit={handleSubmit}
        >
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
          <Button
            types="submit"
            style="bg-[#3D3C99] mt-6 rounded font-bold tracking-wider text-xl py-2 z-20"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </Button>
          <p className="mt-3 z-20">
            Don't have an account? <Link href="/Registration" className="underline">Sign Up</Link>
          </p>
        </form>
        <div className="flex justify-center mb-5">
          <h2 className="text-2xl font-bold text-center mt-3 flex justify-center items-center">
            <hr className="bg-white w-[120px] mr-5" />
            Or
            <hr className="bg-white w-[120px] ml-5" />
          </h2>
        </div>
        <div className="optional mt-2">
          <Button style="md:w-[360px]" onclick={() => signIn('google', { callbackUrl: '/Registration/profileSetup' })}>
            <FaGoogle className="mr-2" />
            Sign In with Google
          </Button>
          <Button
            style="mt-3 md:w-[360px]"
            onclick={() => signIn('github', { callbackUrl: '/Registration/profileSetup' })}
          >
            <FaGithub className="mr-3" />
            Sign In with Github
          </Button>
        </div>
        {alert && <Alert msg={message} />}
      </div>
    </div>
  )
}

export default Login
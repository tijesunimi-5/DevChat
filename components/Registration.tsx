'use client'
import React, { FormEvent, useEffect, useState } from 'react'
import Button from './Button'
import Link from 'next/link'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Alert from './Alert'
import { useUser } from './UserContext'

const Registration = () => {
  const [fullname, setFullname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const {  setUser, signedIn, setSignedIn, setLinkUploadProgress, isProfileSetupComplete, setRegistrationProgress, setProgress, setAlertMessage } = useUser()

  // this checks if the user is already signed in and redirects them to the home page if not, it clears the local storage
  useEffect(() => {
    if (signedIn && isProfileSetupComplete) {
      router.push('/home')
    }
    if (!signedIn && !localStorage.getItem('user')) {
      setLinkUploadProgress(0)
      localStorage.removeItem('dev-projects')
      localStorage.removeItem('dev-more-info')
      localStorage.removeItem('isProfileSetupComplete')
    }
  }, [signedIn, isProfileSetupComplete, setLinkUploadProgress, router])

  // this function handles the form submission and checks if the user is already signed in
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if (!fullname || !email || !password) {
      setAlertMessage('Please fill out all fields')
      setTimeout(() => {
        setLoading(false)
      }, 1500)
      return
    }

    //If all conditions are met
    const firstName = fullname.trim().split(' ')[0] //this get the firstname from the name entered by user
    const userData = { fullname, email, password, firstName }
    setUser(userData)
    setSignedIn(true)
    setAlertMessage('Account created successfully')
    setRegistrationProgress(100)
    setProgress((prev) => Math.min(prev + 10, 100)) //this sets the progress to 10% if the registration is successful
    setTimeout(() => {
      setLoading(false)
      router.push('/Registration/profileSetup')
    }, 1500)
  }



  return (
    <div className="md:w-full md:flex md:justify-center lg:pt-10">
      <div className="pt-12 px-2 relative pb-8 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold uppercase text-center mt-7">Sign Up</h1>
        {/* Form for user input in take */}
        <form
          className="mt-5 linear_bg rounded-2xl regShad p-5 overflow-hidden relative flex flex-col justify-between md:w-[500px]"
          onSubmit={handleSubmit}
        >
          {/* Full name input */}
          <div className="inputbox mt-2">
            <input required type="text" onChange={(e) => setFullname(e.target.value)} value={fullname} />
            <span>Full name</span>
            <i></i>
          </div>

          {/* Email input */}
          <div className="inputbox mt-5">
            <input required type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <span>Email</span>
            <i></i>
          </div>

          {/* Password input */}
          <div className="inputbox mt-5">
            <input required type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <span>Password</span>
            <i></i>
          </div>
          
          <Button
            types="submit"
            style="bg-[#3D3C99] mt-6 rounded font-bold tracking-wider text-xl py-2 z-20 cursor-pointer"
          // disabled={loading}
          >
            {loading ? 'Creating...' : 'Sign Up'}
          </Button>

          {/* redirect if account exists */}
          <p className="mt-3 z-20">
            Have an account? <Link href="/Registration/login" className="underline cursor-pointer">Sign In</Link>
          </p>
        </form>
        <div className="flex justify-center mb-5 px-5">
          <h2 className="text-2xl font-bold text-center mt-3 flex justify-center items-center">
            <hr className="bg-white w-[120px] mr-5" />
            Or
            <hr className="bg-white w-[120px] ml-5" />
          </h2>
        </div>

        {/* Shortcut with next-auth/google auth */}
        <div className="optional mt-2">
          <Button
            style="md:w-[360px] linear_bg hover_btn cursor-pointer border-[#3D3C99] border-2 "
          >
            <FaGoogle className="mr-2" />
            Sign up with Google
          </Button>
          {/* <Button
            style="mt-3 md:w-[360px]"
            onclick={() => signIn('github', { callbackUrl: '/Registration/profileSetup' })}
            // disabled={loading}
          >
            <FaGithub className="mr-3" />
            Sign up with Github
          </Button> */}
        </div>

        
      </div>
    </div>
  )
}

export default Registration
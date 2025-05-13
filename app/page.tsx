'use client'
import Loader from "@/components/Loader";
import Registration from "@/components/Registration";
import MainPage from "@/components/MainPage";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/UserContext";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true)
  const { signedIn, setUser } = useUser()

  // this checks if the user is logged in
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user')
      const storedSignIn = localStorage.getItem('signedIn')

      if (storedUser && storedSignIn === 'true') {
        const user = JSON.parse(storedUser)
        console.log("User from localStorage:", user);

        setUser({
          fullname: user.name || '',
          email: user.email || '',
          password: user.password || '',
        })
      } else {
        setUser({
          fullname: '',
          email: '',
          password: ''
        })
      }
    }
  }, [setUser])

  // this sets a load status duration while page loads
  useEffect(() => {
    const timer = setTimeout(() => { setLoading(false) }, 10000)

    const handleLoad = () => {
      clearTimeout(timer)
      setLoading(false)
    }

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  if (loading) return <Loader />; //if page isn't reading yes, the loader component will be displayed
  if (!signedIn) return <Registration/> //if user isn't registered or logged in, he/she is return to the registration page
  return <MainPage /> //when all conditions are resolved the main page is accessed
}

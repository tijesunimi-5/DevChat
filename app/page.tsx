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
  const router = useRouter()

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

  useEffect(() => {
    const timer = setTimeout(() => { setLoading(false) }, 10000)

    const handleLoad = () => {
      clearTimeout(timer)
      setLoading(false)
    }

    //would be toggled when code becomes more robust. what this does is it waits till the site if fully loaded (it first displays the loading page then when site is loaded, it displays the page content)
    // if (document.readyState === 'complete') {
    //   handleLoad();
    // } else {
    //   window.addEventListener('load', handleLoad)
    // }

    // return () => {
    //   window.removeEventListener('load', handleLoad)
    // }
  }, [])

  // useEffect(() => {
  //   if (!signedIn && !loading) {
  //     router.push('/Registration')
  //   }
  // }, [signedIn, loading, router])

  if (loading) return <Loader />;
  if (!signedIn) return <Registration/>
  return <MainPage />
}

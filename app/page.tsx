'use client'
import Loader from "@/components/Loader";
import Registration from "@/components/Registration";
import MainPage from "@/components/MainPage";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {setLoading(false)}, 10000)

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

  if(loading) return <Loader />;
  return isSignedIn ? <MainPage /> : router.push('/Registration')
}

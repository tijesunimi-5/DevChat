'use client'
import React, { useEffect, useState } from 'react'
import { useUser } from './UserContext'



const Alert = () => {
  const { setAlertMessage, alertMessage } = useUser()
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {    
    if (alertMessage === '' && !visible) {
      setVisible(false)
      return
    } else {
      setVisible(true)

      setTimeout(() => {
        setVisible(false)
      }, 3000)
      setTimeout(() => {

        setAlertMessage('')
      }, 3900)
    }
  }, [alertMessage])

  if (visible) return (
    <div className={`absolute flex justify-center items-center top-[4%] mt-9 w-full blur-effect z-30  left-0`}>
      {/* <div className="blur w-full h-full absolute"></div> */}
      <p className="message z-40 text-[16px] text-center px-2 py-2 md:text-[18px]">{alertMessage}</p>
    </div>
  )
}

export default Alert

'use client'
import React, { useState } from 'react'
import Button from './Button'
import { useUser } from './UserContext'
import Registration from './Registration'

const ChatWidget = () => {
  const [message, setMessage] = useState<string[]>([])
  const [userInput, setUserInput] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [botRes, setBotRes] = useState<boolean>(false)
  const {signedIn, isProfileSetupComplete} = useUser()

  const sendMessage = () => {
    if (userInput) {
      setMessage([...message,
      ` User: ${userInput}`,
      ])
      setUserInput('')

      setLoading(true)
      setBotRes(true)

      setTimeout(()=> {
        setMessage((prevMessage) => [
          ...prevMessage,
          'Bot: Replying...'
        ])

        setTimeout(() => {
          setMessage((prevMessage) => [
            ...prevMessage,
            'Bot: Hello, World!'
          ])

          setLoading(false)
          setBotRes(false)
        }, 2000)
      }, 1000)
    }
  }

  if (!signedIn || !isProfileSetupComplete) return <Registration />;
  return (
    <div className='fixed bottom-4 right-4 p-4  bg-transparent regShad rounded-lg shadow-lg z-50'>
      <div className="h-64 overflow-y-auto">
        <div>
          {message.map((msg, index) => (
            <div key={index} className='p-2'>{msg}</div>
          ))}
        </div>
      </div>
      <div className="flex mt-2">
        <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} className='flex-grow border rounded p-2 outline-none' />
        <Button onclick={sendMessage} style='ml-2 bg-blue-500 text-white p-2 rounded'>Send</Button>
      </div>
    </div>
  )
}

export default ChatWidget

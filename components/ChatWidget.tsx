'use client'
import React, { useState } from 'react'
import Button from './Button'
import { useUser } from './UserContext'
import Registration from './Registration'

// Define the shape of a message
interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatWidget = () => {
  // Explicitly type the messages state as an array of Message objects
  const [messages, setMessages] = useState<Message[]>([])
  const [userInput, setUserInput] = useState('')
  const [loading, setLoading] = useState(false)
  const { signedIn, isProfileSetupComplete } = useUser()

  const sendMessage = () => {
    if (!userInput.trim()) return

    const newUserMessage: Message = { text: userInput, sender: 'user' }
    setMessages([...messages, newUserMessage])
    setUserInput('')
    setLoading(true)

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: 'Replying...', sender: 'bot' }])

      setTimeout(() => {
        setMessages((prev) => {
          const updatedMessages = prev.slice(0, -1)
          return [...updatedMessages, { text: 'Hello, World!', sender: 'bot' }]
        })
        setLoading(false)
      }, 2000)
    }, 1000)
  }

  // Add type annotation for the keyboard event
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      sendMessage()
    }
  }

  if (!signedIn || !isProfileSetupComplete) return <Registration />

  return (
    <div className='w-full'>
      <div className="fixed bottom-4 w-[360px] mx-1.5 md:max-w-lg bg-white rounded-xl shadow-2xl flex flex-col">
        <div className="bg-[#3D3CC9] text-white p-4 rounded-t-xl border-b">
          <h2 className="text-lg font-semibold">Chat Assistant</h2>
        </div>
        <div className="flex-1 h-96 overflow-y-auto p-4 space-y-3 bg-[#3D3CC9]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'user'
                  ? 'bg-blue-300 text-white'
                  : 'bg-gray-200 text-gray-800'
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t bg-black rounded-b-xl">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:-[#3D3CC9]"
              disabled={loading}
            />
            <Button
              onclick={sendMessage}
              style={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            // disabled={loading}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatWidget
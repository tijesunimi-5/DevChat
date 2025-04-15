'use client'
import Button from '@/components/Button'
import React, { useEffect, useState } from 'react'
import { FaTools } from 'react-icons/fa'
import { techStacks, getTechStackForSpecialty } from '../../../techdata'
import { useUser } from '@/components/UserContext'
import Alert from '@/components/Alert'
import { useRouter } from 'next/navigation'

const page = () => {
  const [progress, setProgress] = React.useState<number>(75);
  const [experience, setExperience] = React.useState<number | string>('')
  const [githubLink, setGithubLink] = React.useState<string>('')
  const [twitterLink, setTwitterLink] = React.useState<string>('')
  const [linkedInLink, setLinkedInLink] = React.useState<string>('')
  const [websiteLink, setWebsiteLink] = React.useState<string>('')
  const [field, setField] = useState('Fullstack developer')//this sets the field the developer is in
  const [message, setMessage] = useState<string>('')
  const [alert, setAlert] = useState<boolean>(false)

  const [loading, setLoading] = React.useState<boolean>(false)
  const [userStack, setUserStack] = React.useState<string[]>([]) // this store the technologies used for each fields

  const [techs, setTechs] = useState<string[]>([])//this store the technologies selected by the user
  const [devInfo, setDevInfo] = useState({
    devfield: field,
    devStack: userStack,
    devExperience: experience
  }) //this store the whole details

  const { user, setSignedIn } = useUser()
  const router = useRouter()

  const increaseProgress = () => {
    setProgress(prev => Math.min(prev + 25, 100))
  }

  const changeTechStack = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    setField(e.target.value)
  }

  useEffect(() => {
    const stackMap: { [key: string]: string[] } = {
      'Frontend developer': techStacks.frontend,
      'Fullstack developer': techStacks.fullstack,
      'Backend developer': techStacks.backend,
      'UI/UX designer': techStacks.UIUx,
      'Mobile developer': techStacks.mobile,
      'AI/ML developer': techStacks.AIML,
      'Web3 developer': techStacks.Web3,
      'DevOps developer': techStacks.DevOps,
    }

    const selectedStack = stackMap[field]
    if (selectedStack) {
      setUserStack(selectedStack)
      setTechs([])
      const otherOpt = document.querySelector('.otherOpt')
      if (otherOpt) otherOpt.innerHTML = '' // clear previous input if any
    }
  }, [field])

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target

    setTechs(prev => {
      const updatedTechs = checked
        ? [...prev, value]
        : prev.filter((tech) => tech !== value)

      const otherOpt = document.querySelector('.otherOpt')
      if (updatedTechs.includes('Others')) {
        const existingInput = otherOpt?.querySelector('input')
        if (!existingInput) {
          const newInput = document.createElement('input')
          newInput.className = 'w-[300px] border border-[#3D3C99] rounded mt-2 px-1 py-1'
          newInput.placeholder = 'Input additional tech stack'
          otherOpt?.appendChild(newInput)
        }
      } else {
        if (otherOpt) otherOpt.innerHTML = ''
      }
      return updatedTechs
    })

  }
  useEffect(() => {
    setDevInfo({
      devfield: field,
      devStack: techs,
      devExperience: experience
    })
  }, [field, techs, experience])

  const nextStep = () => {
    if (devInfo.devExperience === '' || devInfo.devStack.length === 0) {
      setMessage('Select all fields!')
      setAlert(true)
      setTimeout(() => {
        setAlert(false)
      }, 2000)
      return;
    }

    //if successful
    setMessage(`55% Completed!`)
    setAlert(true)
    setTimeout(() => {
      setAlert(true)
    }, 2000)
    setSignedIn(true)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
    increaseProgress()
    router.push('/home')
  }

  return (
    <div className='pt-12 px-2 relative pb-8'>
      <h1 className='text-2xl font-bold uppercase text-center mt-5 flex justify-center'>
        Almost there! <FaTools className='text-[#3D3C99] ml-1.5' />
      </h1>

      <div className='mt-5 rounded-2xl regShad p-5 overflow-hidden relative flex flex-col justify-between'>
        <div className="progess h-2 absolute top-0 left-0 right-0  rounded-2xl w-full">
          <span className={`bg-[#3D3C99] absolute h-2 rounded-2xl transition-all duration-200 ease-in-out`} style={{ width: `${progress}%` }}></span>
        </div>

        <div className="devOpt">
          <div>
            <h2>What do you do?</h2>
            <select
              name="devopt"
              value={field}
              onChange={changeTechStack}
              id="devOpt" required
              className='border-[#3D3C99] border rounded w-[320px] py-2 px-1 bg-black'
            >
              <option value="Fullstack developer">Fullstack developer</option>
              <option value="Backend developer">Backend developer</option>
              <option value="Frontend developer">Frontend developer</option>
              <option value="UI/UX designer">UI/UX designer</option>
              <option value="AI/ML developer">AI/ML developer</option>
              <option value="Web3 developer">Web3 developer</option>
              <option value="DevOps developer">DevOps developer</option>
              <option value="Mobile developer">Mobile developer</option>
            </select>
          </div>

          <div className='grid grid-cols-2 w-[300px] mt-3'>
            {userStack.map((stack) => (
              <label key={stack}>
                <input
                  onChange={handleCheckboxChange}
                  type="checkbox"
                  name="tech"
                  id={`techstack-${stack}`}
                  value={stack}
                  checked={techs.includes(stack)}
                  className='mr-1.5 w-[15px] h-[15px]'
                />{stack}
              </label>
            ))}
          </div>
          <div className="otherOpt"></div>

          <div>
            <h2 className='mt-5'>What's your years of experience</h2>
            <input
              type='text'
              required
              className='border-[#3D3C99] border w-[320px] mt-2 rounded py-1 px-1'
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
            />
          </div>

          {/* <div>
            <h2 className='mt-5'>Social links</h2>
            <input
              type='text'
              placeholder='Github (optional)'
              className='border-[#3D3C99] border w-[320px] mt-2 rounded py-1 px-1'
              onChange={(e) => setGithubLink(e.target.value)}
              value={githubLink}
            />
            <input
              type='text'
              placeholder='Twitter (optional)'
              className='border-[#3D3C99] border w-[320px] mt-2 rounded py-1 px-1'
              onChange={(e) => setTwitterLink(e.target.value)}
              value={twitterLink}
            />
            <input
              type='text'
              placeholder='LinkedIn (optional)'
              className='border-[#3D3C99] border w-[320px] mt-2 rounded py-1 px-1'
              onChange={(e) => setLinkedInLink(e.target.value)}
              value={linkedInLink}
            />
            <input
              type='text'
              placeholder='Website (optional)'
              className='border-[#3D3C99] border w-[320px] mt-2 rounded py-1 px-1'
              onChange={(e) => setWebsiteLink(e.target.value)}
              value={websiteLink}
            />

          </div> */}
          <Button onclick={nextStep} style='mt-5 w-[200px] ml-12'>
            {loading ? 'Setting up...' : 'Set Up'}
          </Button>
        </div>
      </div>
      {alert ? <Alert msg={message} /> : ''}
    </div>
  )
}

export default page

'use client'
import Button from '@/components/Button'
import React, { useEffect, useState } from 'react'
import { FaTools } from 'react-icons/fa'
import { techStacks, getTechStackForSpecialty } from '../../../techdata'

const page = () => {
  const [progress, setProgress] = React.useState<number>(75);
  const [experience, setExperience] = React.useState<number | string>('')
  const [githubLink, setGithubLink] = React.useState<string>('')
  const [twitterLink, setTwitterLink] = React.useState<string>('')
  const [linkedInLink, setLinkedInLink] = React.useState<string>('')
  const [websiteLink, setWebsiteLink] = React.useState<string>('')
  const [techStack, setTechStack] = useState('Fullstack developer')//this sets the field the developer is in
  const [loading, setLoading] = React.useState<boolean>(false)
  const [userStack, setUserStack] = React.useState<string[]>([]) // this store the technologies used
  const [techs, setTechs] = useState<string[]>([])

  const nextStep = () => {
    setLoading(true)
    increaseProgress()
  }

  const increaseProgress = () => {
    setProgress(prev => Math.min(prev + 25, 100))
  }

  const changeTechStack = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    setTechStack(e.target.value)
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

    const selectedStack = stackMap[techStack]
    if (selectedStack) {
      setUserStack(selectedStack)
    }
  }, [techStack])

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const checked = e.target.checked

    setTechs(prev => {
      const updatedTechs = checked
        ? [...prev, value]
        : prev.filter((tech) => tech !== value)

      // If 'Others' is in the list, show the input
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
        // otherOpt?.innerHTML = '' // remove extra input if 'Others' is unchecked
      }

      return updatedTechs
    })
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
            <select name="devopt" value={techStack} onChange={changeTechStack} id="devOpt" className='border-[#3D3C99] border rounded w-[320px] py-2 px-1 bg-black'>
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
                <input onChange={handleCheckboxChange} type="checkbox" name="tech" id="techstack" value={stack} className='mr-1.5 w-[15px] h-[15px]' />{stack}
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
            Next Step
          </Button>
        </div>
      </div>
    </div>
  )
}

export default page

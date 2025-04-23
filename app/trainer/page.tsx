'use client'
import Button from '@/components/Button'
import { useUser } from '@/components/UserContext'
import React, { useEffect, useState } from 'react'

const page = () => {
  const { user, setLinkUploadProgress, linkUploadProgress, devInfo, setDevInfo, setQnAProgress, QnAProgress, setTrainModelProgress } = useUser()
  const [edit, setEdit] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [fileName, setFile] = useState<string>('')
  const [portfolioLink, setPortfolioLink] = useState<string>('')
  const [portfolioInfo, setPortfolioInfo] = useState<string>('')
  const [projects, setProjects] = useState<{ link: string, info: string }[]>([])
  const [devFieldEdit, setDevFieldEdit] = useState<string>('')
  const [moreInfo, setMoreInfo] = useState<string>('')

  const capitalizeFullnameFirstLetters = (name?: string) => {
    if (name) {
      return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    }
    return ''
  }
  const fullname = capitalizeFullnameFirstLetters(user.fullname)

  // Load saved data on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('dev-projects')
    const savedMoreInfo = localStorage.getItem('dev-more-info')
    if (savedProjects) setProjects(JSON.parse(savedProjects))
    if (savedMoreInfo) setMoreInfo(savedMoreInfo)
  }, [])

  // Save project
  const saveProject = () => {
    if (!portfolioLink || !portfolioInfo) return

    const newProject = { link: portfolioLink, info: portfolioInfo }
    const updatedProjects = [...projects, newProject]
    setProjects(updatedProjects)
    localStorage.setItem('dev-projects', JSON.stringify(updatedProjects))

    setPortfolioLink('')
    setPortfolioInfo('')

    if (linkUploadProgress < 100) {
      setLinkUploadProgress(100)
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setLoaded(true)
    }, 2000)
  }

  // Save additional info
  const saveMoreInfo = () => {
    localStorage.setItem('dev-more-info', moreInfo)

    if (moreInfo && QnAProgress < 100) {
      setQnAProgress(100)
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setLoaded(true)
    }, 2000)
  }

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file.name)
    }
  }


  const handleDevFieldEdit = (): void => {
    if (!devFieldEdit.trim()) {
      console.warn('Dev field is empty. Not saving.');
      return;
    }

    setDevInfo(prev => ({
      ...prev,
      DevField: devFieldEdit.trim(),
    }));


    console.log('DevField updated to:', devFieldEdit.trim());

    setEdit(null);
  };

  //to toggle edit button
  const editBtn = (index: number) => {
    setEdit(index)
  }

  const trainModel = () => {
    setTrainModelProgress((prev) => prev + 100)
  }

  return (
    <div className='pt-12 px-3 overflow-hidden'>
      <ul>
        <h2 className='text-[22px] font-bold tracking-wide'>Tips:</h2>
        <li className='tip'>• Always make sure to confirm your information before you train your model.</li>
        <li className='tip'>• When you save your information, the model starts its learning.</li>
      </ul>

      <div className='flex gap-9 overflow-x-scroll overflow-y-hidden'>
        {/* Editable sections */}
        <div className='w-[2000px] flex gap-10 h-[300px]'>
          <div className='section1 h-full w-[300px] ml-3'>
            <div className="regShad px-3 py-2 mt-3 relative">
              <p className="ques">What's your name?</p>
              <p className="ans border-[#fff] py-1 border rounded px-1 mt-2">
                {fullname}
              </p>
            </div>

            <div className="regShad px-3 py-4 mt-5 relative">
              <p className="ques">What development do you specialize in?</p>
              <Button onclick={() => editBtn(1)} style={`align-right flex top-2 right-3 h-[21px] ${edit === 1 ? 'hidden' : 'block'}`}>Edit</Button>
              {edit === 1
                ?
                (<>
                  <input type='text' className='border-white border w-[275px] rounded py-1 px-1 mt-2' value={devFieldEdit} onChange={(e) => setDevFieldEdit(e.target.value)} />
                  <Button style='h-[22px] mt-3' onclick={handleDevFieldEdit}>Save</Button>
                </>)
                :
                (<>
                  <p className="ans border-[#fff] py-1 border rounded px-1 mt-2">
                    {devInfo.DevField}
                  </p>
                </>)}
            </div>
          </div>

          <div className="section2 w-[348px] mr-2">
            <div className="regShad px-3 py-3 mt-3">
              <p className="plink tip">Drop your project link and explict info (all your live works/projects)</p>
              <input
                type='text'
                placeholder='link'
                className='border-white border w-[325px] rounded py-1 px-1 mt-2 outline-none'
                value={portfolioLink}
                onChange={(e) => setPortfolioLink(e.target.value)}
              />
              <textarea
                placeholder='enter details about project here'
                className='resize-none h-[120px] mt-2 rounded w-[325px] border outline-none px-2'
                value={portfolioInfo}
                onChange={(e) => setPortfolioInfo(e.target.value)}
              />
              <Button style='h-[30px]' onclick={saveProject}>
                {loading ? 'Saving' : 'Save Project'}
              </Button>
            </div>
          </div>

          <div className="section3 mr-2 w-[330px] mt-3">
            <div className="regShad h-[200px] px-3 py-1 relative">
              <label htmlFor="resume" className='h-12 border border-white px-2 py-2 rounded block cursor-pointer mt-3'>
                Provide your resume
              </label>
              <input type="file" accept='application/pdf' className='hidden' id='resume' onChange={handlePdfChange} />
              {fileName && (
                <p className='pt-3'>
                  File: <b>{fileName}</b>
                </p>
              )}
              <Button style='h-[30px] absolute bottom-2' onclick={saveProject}>
                {loading ? 'Saving' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Display saved projects */}
      <div className='mt-10'>
        <h1 className='text-[22px] font-bold tracking-wide'>Saved Projects</h1>
        <ul className='space-y-4 mt-4'>
          {projects.map((project, index) => (
            <li key={index} className='regShad p-2 rounded'>
              <p><strong>Link:</strong> <a href={project.link} className='underline'>{project.link}</a></p>
              <p><strong>Info:</strong> {project.info}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Additional Info Section */}
      <div className='mt-10 pb-10'>
        <h1 className="additional text-[22px] font-bold tracking-wide">More Info</h1>
        <p className="tip">• Add additional information about yourself here</p>
        <textarea
          className='regShad resize-none h-[200px] outline-none w-[350px] mt-2 px-2'
          value={moreInfo}
          onChange={(e) => setMoreInfo(e.target.value)}
        />
        <Button style='h-[30px] mt-2' onclick={saveMoreInfo}>
          {loading ? 'Saving' : 'Save'}
        </Button>
      </div>

      <Button style='mb-5 h-[35px] ml-[100px]' onclick={trainModel}>Train Model</Button>

      {loading && (
        <>
          <div className='w-[300px] bg-black rounded-3xl h-2 overflow-hidden flex mb-7 ml-5 mt-7 relative'>
            <span className='w-[50px] rounded-2xl bg-white h-2 loader'></span>
          </div>


          {loaded && (
            <>
              <div className='mb-6'>
                <p className='text-center text-2xl text-col font-bold'>Chatbot has been fully trained</p>
                <div className="preview text-xl ">Preview your chatbot <a href="/" className='underline'>here</a></div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default page

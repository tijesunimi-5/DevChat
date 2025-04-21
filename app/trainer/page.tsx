'use client'
import Button from '@/components/Button'
import { useUser } from '@/components/UserContext'
import React, { useState } from 'react'

const page = () => {
  const { user, setLinkUploadProgress, setQnAProgress, devInfo, setDevInfo, linkUploadProgress } = useUser()
  const [edit, setEdit] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [fileName, setFile] = useState<string>('')
  const [portfolioLink, setPortfolioLink] = useState<string>('')
  const [portfolioInfo, setPortfolioInfo] = useState<string>('')
  const [devFieldEdit, setDevFieldEdit] = useState<string>('')
  const [editName, setEditName] = useState(user.fullname || '')

  //this function converts the user's first character name to capital letter
  const capitalizeFullnameFirstLetters = (name?: string) => {
    if (name) {
      return name
        .split(' ') // Split the name by spaces
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
        .join(' '); // Join the words back together with a space
    }
    return '';
  };
  const fullname = capitalizeFullnameFirstLetters(user.fullname);

  //to toggle edit button
  const editBtn = (index: number) => {
    setEdit(index)
  }

  //to toggle off edit mode
  const saveBtn = (index: number) => {
    setEdit(null)
  }

  //this function checks if portfolio inputs are empty if not it sets the linkprogress to 100
  const save = () => {
    setLoading(true)
    if (!portfolioInfo || !portfolioLink) return

    //this function checks from localstorage if the user has filled this link if not adds 100 to it
    if (linkUploadProgress < 100) {
      setLinkUploadProgress(100)
      setTimeout(() => {
        setLoading(false)
        setLoaded(true)
      }, 4000)
    }

  }

  //this function handles the change in pdf input file, get the file, and filename
  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file.name)
    }
  };

  //this is the function for devfieldedit
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


  return (
    <div className='pt-12 px-3 overflow-hidden'>
      {/* check if user hasn't done this phase */}
      <ul>
        <h2 className='text-[22px] font-bold tracking-wide'>Tips:</h2>
        <li className='tip'>• Always make sure to confirm your information before you train your model.</li>
        <li className='tip'>• When you save your information, the model starts it's learning.</li>
      </ul>

      <div className='flex gap-9 overflow-x-scroll overflow-y-hidden'>
        <div className='w-[2000px] flex gap-10 h-[280px]'>
          <div className='section1 h-full w-[300px] ml-3'>
            <div className="regShad px-3 py-2 mt-3 relative">
              <p className="ques">What's your name?</p>
              <Button onclick={() => editBtn(0)} style={`absolute top-2 right-3 h-[21px] ${edit === 0 ? 'hidden' : 'block'}`}>
                Edit
              </Button>

              {edit === 0 ? (<>
                <input type='text' className='border-white border w-[275px] rounded py-1 px-1 mt-2' />
                <Button style='h-[22px] mt-3'>Save</Button>
              </>)
                :
                (<p className="ans border-[#fff] py-1 border rounded px-1 mt-2">
                  {fullname}
                </p>)}
            </div>

            <div className="regShad px-3 py-2 mt-5 relative">
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
            <div className="regShad px-3 py-1 mt-3">
              <p className="plink">
                Drop your portfolio link
              </p>
              <input type='text' placeholder='link' className='border-white border w-[325px] rounded py-1 px-1 mt-2 outline-none' value={portfolioLink} onChange={(e) => setPortfolioLink(e.target.value)} />

              <textarea name="info" placeholder='enter details about portfolio here' className='resize-none h-[120px] mt-2 rounded w-[325px] border outline-none px-2' value={portfolioInfo} onChange={(e) => setPortfolioInfo(e.target.value)}></textarea>
              <Button style='h-[30px]' onclick={save}>Save</Button>
            </div>
          </div>

          <div className="section3 mr-2 w-[330px] mt-3">
            <div className="regShad h-[200px] px-3 py-1 relative">
              <div className="pt-3"></div>
              <label htmlFor="resume" className='h-12 border border-white px-2 py-2 rounded'>
                Provide your resume
              </label>
              <input type="file" accept='application/pdf' className='hidden' id='resume' onChange={handlePdfChange} />
              {fileName && (
                <p className='pt-3'>
                  File: {' '}
                  <b>
                    {fileName}
                  </b>
                </p>
              )}

              <p className='mt-7 tip'>• Make sure your resume is in pdf format</p>

              <Button
                style='h-[30px] absolute bottom-2'
                onclick={save}>
                {loading ? 'saving' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="moreInfo mt-7">
        <h1 className='text-[22px] font-bold tracking-wide'>
          Project Description
        </h1>
        <p className="tip">• Add project link and information here</p>
        <input type='text' placeholder='link' className='border-white border w-[350px] rounded py-1 px-1 mt-2 outline-none' />
        <textarea className='regShad resize-none h-[200px] outline-none w-[350px] mt-2 px-2' placeholder='info' />

        <Button style='h-[30px] mt-3'
          onclick={save}>
          {loading ? 'saving' : 'Save'}
        </Button>
      </div>

      <div className='mt-10'>
        <h1 className="additional text-[22px] font-bold tracking-wide">
          More Info
        </h1>
        <p className="breif tip">
          • Add additional information about yourself here
        </p>
        <textarea className='regShad resize-none h-[200px] outline-none w-[350px] mt-2 px-2' />

        <Button style='h-[30px]'
          onclick={save}>
          {loading ? 'saving' : 'Save'}
        </Button>
      </div>

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

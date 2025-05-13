'use client';
import Button from '@/components/Button';
import React, { useEffect, useState } from 'react';
import { FaTools } from 'react-icons/fa';
import { techStacks } from '../../../techdata';
import { useUser } from '@/components/UserContext';
import Alert from '@/components/Alert';
import { useRouter } from 'next/navigation';
import Registration from '@/components/Registration';

const Page = () => {
  const [experience, setExperience] = useState<string | number>(0);
  const [field, setField] = useState('Fullstack developer');
  const [message, setMessage] = useState<string>('');
  const [alert, setAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userStack, setUserStack] = useState<string[]>([]);
  const [techs, setTechs] = useState<string[]>([]);
  const [otherTechs, setOtherTechs] = useState<string[]>([]);
  const {  setProgress, devInfo, setDevInfo, setIsProfileSetupComplete, signedIn, setTechStackProgress } = useUser();
  const router = useRouter();

  // This gets the tech line the person is into either, frontend or backend or ml...
  const changeTechStack = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setField(e.target.value);
  };

  // this get the necessary tech stack from the stack list when the user's selected stack matches, it displays the tech stack in relation to the dev's field
  useEffect(() => {
    const stackMap: { [key: string]: string[] } = {
      'Frontend developer': techStacks['Frontend developer'],
      'Fullstack developer': techStacks['Fullstack developer'],
      'Backend developer': techStacks['Backend developer'],
      'UI/UX designer': techStacks['UI/UX designer'],
      'Mobile developer': techStacks['Mobile developer'],
      'AI/ML developer': techStacks['AI/ML developer'],
      'Web3 developer': techStacks['Web3 developer'],
      'DevOps developer': techStacks['DevOps developer'],
    };

    const selectedStack = stackMap[field];
    if (selectedStack) {
      setUserStack(selectedStack);
      setTechs([]);
      setOtherTechs([]);
    }
  }, [field]);

  // this handles the tech stack check boxes and also checks if the other btn is called
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setTechs((prev) => {
      const updatedTechs = checked ? [...prev, value] : prev.filter((tech) => tech !== value);
      if (!updatedTechs.includes('Others')) {
        setOtherTechs([]);
      }
      return updatedTechs;
    });
  };

  // this is the function that saves and allows for other tech stacks
  const addOtherTech = () => {
    setOtherTechs((prev) => [...prev, '']);
  };

  // this toggle a close if you don't want to add new stack
  const removeOtherTech = (index: number) => {
    setOtherTechs((prev) => prev.filter((_, i) => i !== index));
  };

  // this get's the value of the new tech stack and adds it to the list
  const updateOtherTech = (index: number, value: string) => {
    setOtherTechs((prev) => {
      const newTechs = [...prev];
      newTechs[index] = value;
      return newTechs;
    });
  };

  // this set's the field and the updatedTechs, removes the option of "Others" when mapping and then the setDev info is setted
  useEffect(() => {
    const updatedTechs = [...techs.filter((tech) => tech !== 'Others'), ...otherTechs.filter((tech) => tech.trim() !== '')];
    setDevInfo({
      DevField: field,
      DevExperience: experience,
      DevStack: updatedTechs,
    });
  }, [field, techs, experience, otherTechs, setDevInfo]);

  // final expression when all requirements are attended to
  const nextStep = () => {
    if (devInfo.DevExperience === 0 || devInfo.DevStack.length === 0) {
      setMessage('Select all fields!');
      setAlert(true);
      setTimeout(() => setAlert(false), 2000);
      return;
    }

    setMessage('20% Completed!');
    setAlert(true);
    setTimeout(() => setAlert(false), 2000);
    setIsProfileSetupComplete(true); // Mark profile setup as complete
    localStorage.setItem('isProfileSetupComplete', 'true');
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
    setTechStackProgress(100)
    setProgress((prev) => Math.min(prev + 10, 100))
    router.push('/home');
  };

  if(!signedIn) return <Registration />

  return (
    <div className="md:w-full md:flex md:justify-center">
      <div className="pt-12 px-2 relative pb-8 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold uppercase text-center mt-5 flex justify-center">
          Almost there! <FaTools className="text-[#3D3C99] ml-1.5" />
        </h1>
        <div className="mt-5 rounded-2xl regShad p-5 overflow-hidden relative flex flex-col justify-between md:w-[500px]">
          <div className="devOpt">

            {/* Option to choose dev field */}
            <div>
              <h2>What do you do?</h2>
              <select
                name="devopt"
                value={field}
                onChange={changeTechStack}
                id="devOpt"
                required
                className="border-[#3D3C99] border rounded w-[320px] py-2 px-1 bg-black md:w-[450px]"
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
            {/* fetches the tech stack in respect to the user's dev field */}
            <div className="grid grid-cols-2 w-[300px] mt-3 md:w-[500px] md:grid-cols-3">
              {userStack.map((stack) => (
                <label key={stack}>
                  <input
                    onChange={handleCheckboxChange}
                    type="checkbox"
                    name="tech"
                    id={`techstack-${stack}`}
                    value={stack}
                    checked={techs.includes(stack)}
                    className="mr-1.5 w-[15px] h-[15px]"
                  />
                  {stack}
                </label>
              ))}
            </div>
            {/* for the other option */}
            {techs.includes('Others') && (
              <div className="otherOpt">
                <div className="mt-2">
                  {otherTechs.map((tech, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        className="w-[300px] border border-[#3D3C99] rounded px-1 py-1"
                        placeholder="Input additional tech stack"
                        value={tech}
                        onChange={(e) => updateOtherTech(index, e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => removeOtherTech(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  {/* trigger for more stack */}
                  <button
                    type="button"
                    onClick={addOtherTech}
                    className="text-[#3D3C99] hover:text-[#2a2a6d] mt-2"
                  >
                    + Add Another Tech Stack
                  </button>
                </div>
              </div>
            )}

            {/* Input for user's years of experience */}
            <div>
              <h2 className="mt-5">What's your years of experience</h2>
              <input
                type="text"
                required
                className="border-[#3D3C99] border w-[320px] mt-2 rounded py-1 px-1 outline-none md:w-[440px]"
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
            <div className="md:flex md:ml-[70px] md:mt-8">
              <Button onclick={nextStep} style="mt-5 w-[200px] ml-12">
                {loading ? 'Setting up...' : 'Set Up'}
              </Button>
            </div>
          </div>
        </div>
        {alert && <Alert msg={message} />}
      </div>
    </div>
  );
};

export default Page;
'use client';
import Button from '@/components/Button';
import { useUser } from '@/components/UserContext';
import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { motion } from 'framer-motion';
import Registration from '@/components/Registration';
import { filterTechStack } from '../../techdata';
import AddMoreStacks from '@/components/AddMoreStacks';
import Link from 'next/link';

const page = () => {
  const { user, devInfo, signedIn, isProfileSetupComplete, barVisible } = useUser();
  const [information, setInformation] = useState<string | null>('');

  useEffect(() => {
    const info = localStorage.getItem('dev-more-info');
    setInformation(info);
  }, []);

  const capitalizeFirstName = (name?: string) => {
    if (name) {
      const firstName = name.split(' ')[0]; // Get the first name
      return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(); // Capitalize the first letter of the first name
    }
    return '';
  };
  const firstname = capitalizeFirstName(user.fullname);

  useEffect(() => {
    gsap.fromTo(".p-txt", {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 2,
    })
  }, [])

  if (!signedIn || !isProfileSetupComplete) return <Registration />;
  return (
    <div className="pt-12 px-3 relative xl:mx-[220px]">
      {barVisible && (<div className={`blur absolute top-0 right-0 left-0 bottom-0 z-40`}></div>)}
      <div className="devProfile mt-10">
        <h1 className="p-txt text-3xl font-bold tracking-wide ml-3 md:mt-5 md:mx-10 z-20">Dev• {firstname}</h1>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.7,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 2,
            staggerChildren: 0.3,
          }}
          className="devStack regShad px-2 py-4 mt-4 relative scale md:mx-10"
        >
          <div className="field text-2xl font-bold tracking-wide leading-relaxed mb-2 mt-[-8px]">{devInfo.DevField}</div>

          <div className="stack mx-3">
            <ul className="grid grid-cols-3 leading-relaxed pb-3">
              {(() => {
                const filteredStacks = filterTechStack(devInfo.DevStack);
                return filteredStacks.map((stack, idx) => (
                  <li key={idx}>{stack}</li>
                ));
              })()}
            </ul>
            <AddMoreStacks />
          </div>
        </motion.div>

        <div className="about mt-8 md:mx-10">
          <motion.h1
            initial={{
              marginLeft: '-150px',
              opacity: 0,
            }}
            animate={{
              marginLeft: 0,
              opacity: 1,
            }}
            transition={{
              duration: 2,
              delay: 2,
            }}
            className="font-bold tracking-wide text-2xl"
          >
            About Me
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 2,
              delay: 2.5,
            }}
            className="text-[18px] leading-relaxed h-[100px]"
          >
            {information ? information : 'No information provided yet'}
          </motion.p>

          <motion.p
            initial={{
              marginTop: '200px',
              opacity: 0,
            }}
            animate={{
              marginTop: 0,
              opacity: 1,
            }}
            transition={{
              duration: 2,
              delay: 2.8,
            }}
            className="text-gray-500 text-[13px] mt-5 font-mono"
          >
            To edit details about yourself, go to{' '}
            <Link href={'/trainer'} className="underline text-col">
              devChat trainer
            </Link>{' '}
            under more info
          </motion.p>
        </div>
      </div>
    </div>
  );
};


export default page;
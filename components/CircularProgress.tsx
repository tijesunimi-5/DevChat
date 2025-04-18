'use client'
import React, { useEffect, useState } from 'react'

interface CircularProgressProps {
  percentage: number;
  delay?: number
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage, delay = 0 }) => {
  const [progess, setProgress] = useState<number>(0)

  //to animate the progress from 0 to given end point
  useEffect(() => {
    let start = 0;
    const end = percentage;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min((elapsed / duration) * end, end);
      setProgress(Math.floor(progress));
      if (progress < end) {
        requestAnimationFrame(animate);
      }
    };

    const delayFunc = () =>{
      setTimeout(() => {
        requestAnimationFrame(animate)
      }, delay)
    }

    if (delay === 0) {
      requestAnimationFrame(animate);
    } else {
      delayFunc()
    }
    
    return () => {
      setProgress(0)
    }
  }, [percentage]);


  //circle calculation
  const radius = 45;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = (progess / 100) * circumference

  return (
    <div className='circle-container flex justify-center items-center flex-col'>
      <svg className='circle' width={120} height={120}>
        <circle className='circle-bg' cx='60' cy='60' r={radius} strokeWidth={strokeWidth} fill='none' />
        <circle className='circle-progress' cx='60' cy='60' r={radius} strokeWidth={strokeWidth} fill='none' strokeDasharray={circumference} strokeDashoffset={offset} />
      </svg>
      <div className="percentage">{progess}%</div>
    </div>
  )
}

export default CircularProgress
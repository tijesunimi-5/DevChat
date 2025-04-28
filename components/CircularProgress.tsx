'use client'
import React, { useEffect, useState } from 'react'

interface CircularProgressProps {
  percentage: number;
  delay?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage, delay = 0 }) => {
  const [progess, setProgress] = useState<number>(0)
  const [circleRadius, setCircleRadius] = useState<number>(45)
  const [cx, setCx] = useState<number>(60)
  const [cy, setCy] = useState<number>(60)
  const [sWidth, setSWidth] = useState<number>(10)

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

    const delayFunc = () => {
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

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setCircleRadius(80)
      setCx(88)
      setCy(88)
      setSWidth(15)
    }
  })

  //circle calculation
  const radius = circleRadius;
  const strokeWidth = sWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = (progess / 100) * circumference

  console.log(radius)

  return (
    <div className='circle-container flex justify-center items-center flex-col mt-2'>
      <svg className='circle w-[120px] h-[120px] md:w-[175px] md:h-[175px]'>
        <circle className='circle-bg' cx={cx} cy={cy} r={radius} strokeWidth={strokeWidth} fill='none' />
        <circle className='circle-progress' cx={cx} cy={cy} r={radius} strokeWidth={strokeWidth} fill='none' strokeDasharray={circumference} strokeDashoffset={offset} />
      </svg>
      <div className="percentage">{progess}%</div>
    </div>
  )
}

export default CircularProgress
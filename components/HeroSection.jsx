'use client'

import { useState, useEffect } from 'react'
import ImageGallery from './ImageGallery'
import { images } from '@/constants/images'
import { shuffle } from '@/utils/shuffle'

const HeroSection = () => {
  const [shuffledImages, setShuffledImages] = useState(images)

  useEffect(() => {
    setShuffledImages(shuffle([...images]))
  }, [])

  return (
    <section className='flex flex-col md:flex-row relative'>

      {/* Title */}
      <div className='flex w-full md:w-[65%] h-[45svh] md:h-auto items-center justify-center'>
        <h1 className='text-[3.8rem] md:text-[7rem] font-black tracking-wider'>ASA7UR</h1>
      </div>

      {/* Gallery — no overflow-hidden on mobile (ImageGallery's inner div clips), desktop keeps it */}
      <div className='w-full md:w-[35%] md:h-auto md:overflow-hidden'>
        <ImageGallery images={shuffledImages} />
      </div>

      {/* SCROLL indicator — desktop only */}
      <div className='hidden md:flex absolute bottom-6 left-8 items-center gap-3 text-[0.6rem] tracking-[0.3em] text-neutral-400 select-none pointer-events-none'>
        <span>SCROLL</span>
        <span style={{ display: 'inline-block', animation: 'nudgeRight 1.6s ease-in-out infinite' }}>
          →
        </span>
      </div>

    </section>
  )
}

export default HeroSection

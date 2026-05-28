'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CldImage } from 'next-cloudinary'

gsap.registerPlugin(ScrollTrigger)

const IMG_W = 42 // vw per image on mobile

const ImageGallery = ({ images }) => {
  const galleryRef = useRef(null)
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)

  // Desktop: 3 columns of 8
  const grouped = images.slice(0, 24).reduce((acc, image, index) => {
    const colIndex = Math.floor(index / 8)
    if (!acc[colIndex]) acc[colIndex] = []
    acc[colIndex].push(image)
    return acc
  }, [])

  // Mobile: 2 rows of 12
  const row1 = images.slice(0, 12)
  const row2 = images.slice(12, 24)

  useGSAP(() => {
    if (window.innerWidth >= 768) return

    const r1 = row1Ref.current
    const r2 = row2Ref.current
    const section = galleryRef.current?.closest('section')
    if (!r1 || !r2 || !section) return

    const scrollDistance = r1.scrollWidth - window.innerWidth
    if (scrollDistance <= 0) return

    // 0.55 → images travel 55% of the full strip distance per section scroll → slower feel
    const travel = scrollDistance * 0.55

    const stConfig = {
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 2,
    }

    // Row 1: starts at 0, moves left →→→
    gsap.to(r1, {
      x: -travel,
      ease: 'none',
      scrollTrigger: stConfig,
    })

    // Row 2: starts at opposite end, moves right ←←← (zigzag)
    gsap.fromTo(
      r2,
      { x: -travel },
      { x: 0, ease: 'none', scrollTrigger: stConfig }
    )
  }, [])

  return (
    <>
      {/* Desktop: 3 vertical columns with parallax */}
      <div className='image-gallery hidden md:flex h-full'>
        {grouped.map((column, colIndex) => (
          <div
            key={colIndex}
            className={`col col-${colIndex + 1} flex flex-col items-center justify-center opacity-0 flex-1`}
            style={{
              animation: 'fadeIn 500ms ease-in forwards',
              animationDelay: `${colIndex * 250}ms`,
            }}
          >
            {column.map((img) => (
              <CldImage
                key={img.id}
                src={img.image}
                alt={img.name}
                width={400}
                height={500}
                sizes='12vw'
                className='h-auto bg-black object-cover w-full'
                style={{
                  minHeight: 'clamp(80px, 25vw, 300px)',
                  padding: colIndex === 1 ? '0.2rem 0' : '0.2rem 0.5rem',
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Mobile: 2-row horizontal gallery with zigzag */}
      <div
        ref={galleryRef}
        className='md:hidden w-full overflow-hidden'
        style={{ height: '70svh' }}
      >
        <div className='flex flex-col h-full gap-[3px]'>

          {/* Row 1 — moves left as page scrolls, images fade in left→right */}
          <div ref={row1Ref} className='flex flex-1 gap-[3px]'>
            {row1.map((img, idx) => (
              <div
                key={img.id}
                className='flex-shrink-0 h-full'
                style={{
                  width: `${IMG_W}vw`,
                  opacity: 0,
                  animation: 'fadeIn 400ms ease-in forwards',
                  animationDelay: `${idx * 70}ms`,
                }}
              >
                <CldImage src={img.image} alt={img.name} width={400} height={500} sizes='42vw' className='w-full h-full object-cover' priority={idx < 3} />
              </div>
            ))}
          </div>

          {/* Row 2 — starts offset left, moves right as page scrolls, same stagger */}
          <div ref={row2Ref} className='flex flex-1 gap-[3px]'>
            {row2.map((img, idx) => (
              <div
                key={img.id}
                className='flex-shrink-0 h-full'
                style={{
                  width: `${IMG_W}vw`,
                  opacity: 0,
                  animation: 'fadeIn 400ms ease-in forwards',
                  animationDelay: `${idx * 70}ms`,
                }}
              >
                <CldImage src={img.image} alt={img.name} width={400} height={500} sizes='42vw' className='w-full h-full object-cover' priority={idx < 3} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default ImageGallery

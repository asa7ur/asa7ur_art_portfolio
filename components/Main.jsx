'use client'

import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from './HeroSection'
import ContentSection from './ContentSection'
import ProductsSection from './ProductsSection'
import { setupGSAPAnimations } from '@/utils/gsapAnimations'

const Main = () => {
  const containerRef = useRef(null)
  const [isOverlayVisible, setOverlayVisible] = useState(false)

  useGSAP(() => {
    if (window.innerWidth < 768) return
    const tl = setupGSAPAnimations(containerRef)
    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <div>
      <div className='flex flex-col md:flex-row' ref={containerRef}>
        <HeroSection />
        <ContentSection onShowOverlay={() => setOverlayVisible(true)} />
      </div>
      <ProductsSection
        isVisible={isOverlayVisible}
        onClose={() => setOverlayVisible(false)}
      />
    </div>
  )
}

export default Main

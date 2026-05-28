import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const setupGSAPAnimations = (containerRef) => {
  const container = containerRef.current
  const scrollDistance = container.scrollWidth - window.innerWidth

  // Horizontal scroll timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      scrub: 1,
      pin: true,
      start: 'top top',
      end: () => `+=${scrollDistance}`,
    },
  })

  tl.to(container, {
    x: () => -scrollDistance + 'px',
    ease: 'none',
    duration: 1,
  })

  // Image gallery parallax
  gsap.to('.col-1', {
    y: -250,
    ease: 'none',
    scrollTrigger: {
      trigger: '.image-gallery',
      start: 'top center',
      end: () => `+=${scrollDistance}`,
      scrub: 3,
    },
  })

  gsap.to('.col-2', {
    y: 250,
    ease: 'none',
    scrollTrigger: {
      trigger: '.image-gallery',
      start: 'top center',
      end: () => `+=${scrollDistance}`,
      scrub: 3,
    },
  })

  gsap.to('.col-3', {
    y: -250,
    ease: 'none',
    scrollTrigger: {
      trigger: '.image-gallery',
      start: 'top center',
      end: () => `+=${scrollDistance}`,
      scrub: 3,
    },
  })

  // Sidebar fade in
  gsap.to('.sidebar', {
    opacity: 1,
    scrollTrigger: {
      trigger: '.sidebar',
      start: () => `center+=${scrollDistance * 0.88} center`,
      end: () => `center+=${scrollDistance * 1.0} center`,
      scrub: 4,
    },
  })

  // Content section reveals — set initial hidden state immediately
  gsap.set('.content-garik', { opacity: 0, y: -22 })
  gsap.set('.content-bottom', { opacity: 0, y: 22 })

  gsap.to('.content-garik', {
    opacity: 1,
    y: 0,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.sidebar',
      start: () => `center+=${scrollDistance * 0.74} center`,
      end: () => `center+=${scrollDistance * 0.91} center`,
      scrub: 2,
    },
  })

  gsap.to('.content-bottom', {
    opacity: 1,
    y: 0,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.sidebar',
      start: () => `center+=${scrollDistance * 0.80} center`,
      end: () => `center+=${scrollDistance * 0.97} center`,
      scrub: 2,
    },
  })

  return tl
}

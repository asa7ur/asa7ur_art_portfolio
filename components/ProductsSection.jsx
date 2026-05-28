'use client'

import { useState, useEffect, useCallback } from 'react'
import { FaInstagram, FaShoppingCart, FaTimes } from 'react-icons/fa'
import { CldImage } from 'next-cloudinary'
import { shuffle } from '@/utils/shuffle'

const ALLOWED_ORIGINS = ['www.etsy.com', 'etsy.com', 'www.instagram.com', 'instagram.com']

function safeUrl(value) {
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') return null
    if (!ALLOWED_ORIGINS.includes(url.hostname)) return null
    return url.href
  } catch {
    return null
  }
}

const SearchIcon = () => (
  <svg className='w-3.5 h-3.5 text-white/40 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
  </svg>
)

const ProductsSection = ({ isVisible, onClose }) => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [colCount, setColCount] = useState(4)

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setColCount(2)
      else if (window.innerWidth < 1024) setColCount(3)
      else setColCount(4)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const fetchImages = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/images')
      if (!res.ok) throw new Error()
      setImages(shuffle(await res.json()))
    } catch {
      setError('Failed to load images. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  // Prefetch on mount so data is ready before the overlay opens
  useEffect(() => {
    fetchImages()
  }, [fetchImages])


  // Lock background scroll while overlay is open (works on iOS Safari too)
  useEffect(() => {
    if (!isVisible) return
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [isVisible])

  const filteredImages = images.filter((img) =>
    img.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black flex flex-col text-white z-[999] transition-transform duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 pointer-events-auto' : 'translate-y-[100vh] pointer-events-none'
      }`}
    >
      {/* ── Header ── */}
      <div className='flex-shrink-0 border-b border-white/10'>

        {/* Desktop: brand + search + close */}
        <div className='hidden md:flex items-center justify-between px-8 py-5'>
          <span className='text-xs tracking-[0.5em] text-white/50 select-none'>ASA7UR</span>
          <div className='flex items-center gap-3 border-b border-white/30 pb-2 w-80'>
            <SearchIcon />
            <input
              type='text'
              placeholder='SEARCH'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='bg-transparent text-white text-sm tracking-[0.2em] placeholder:text-white/35 outline-none w-full font-[inherit]'
            />
            {search && (
              <button onClick={() => setSearch('')} className='text-white/35 hover:text-white/70 transition-colors cursor-pointer'>
                <FaTimes className='text-sm' />
              </button>
            )}
          </div>
          <button onClick={onClose} aria-label='Close collection' className='group flex items-center gap-3 cursor-pointer'>
            <span className='text-xs tracking-[0.4em] text-white/50 group-hover:text-white transition-colors duration-300'>CLOSE</span>
            <span className='flex items-center justify-center w-8 h-8 border border-white/25 text-white/50 group-hover:border-white group-hover:text-white transition-all duration-300'>
              <FaTimes className='text-xs' />
            </span>
          </button>
        </div>

        {/* Mobile: search + close in one row */}
        <div className='md:hidden flex items-center gap-3 px-5 py-4'>
          <SearchIcon />
          <input
            type='text'
            placeholder='SEARCH'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='bg-transparent text-white text-sm tracking-[0.2em] placeholder:text-white/35 outline-none flex-1 font-[inherit]'
          />
          {search && (
            <button onClick={() => setSearch('')} className='text-white/35 transition-colors cursor-pointer flex-shrink-0'>
              <FaTimes className='text-sm' />
            </button>
          )}
          <button
            onClick={onClose}
            aria-label='Close collection'
            className='flex items-center justify-center w-9 h-9 border border-white/25 text-white/50 flex-shrink-0'
          >
            <FaTimes className='text-sm' />
          </button>
        </div>

      </div>

      {/* Piece count */}
      {!loading && !error && (
        <div className='px-5 md:px-8 py-3 border-b border-white/5 flex-shrink-0'>
          <span className='text-sm tracking-[0.3em] text-white/35'>
            {filteredImages.length} {filteredImages.length === 1 ? 'PIECE' : 'PIECES'}
          </span>
        </div>
      )}

      {/* Grid */}
      <div className='flex-1 overflow-y-auto px-4 md:px-8 py-5 md:py-7'>

        {loading && (
          <div className='flex items-center justify-center h-full'>
            <span className='text-sm tracking-[0.4em] text-white/40'>LOADING...</span>
          </div>
        )}

        {error && (
          <div className='flex items-center justify-center h-full'>
            <span className='text-sm tracking-[0.25em] text-red-400/70'>{error.toUpperCase()}</span>
          </div>
        )}

        {!loading && !error && filteredImages.length === 0 && images.length > 0 && (
          <div className='flex flex-col items-center justify-center h-full gap-4'>
            <span className='text-sm tracking-[0.3em] text-white/40'>
              NO RESULTS FOR &ldquo;{search.toUpperCase()}&rdquo;
            </span>
            <button
              onClick={() => setSearch('')}
              className='text-xs tracking-[0.3em] text-white/30 hover:text-white/60 transition-colors duration-300 cursor-pointer underline underline-offset-4'
            >
              CLEAR SEARCH
            </button>
          </div>
        )}

        {!loading && !error && filteredImages.length > 0 && (
          <div className='flex gap-4'>
            {Array.from({ length: colCount }, (_, ci) => (
              <div key={ci} className='flex-1 flex flex-col gap-4'>
                {filteredImages
                  .filter((_, i) => i % colCount === ci)
                  .map((image, index) => (
                    <div key={image.id} className='relative overflow-hidden group bg-neutral-900'>
                      <CldImage
                        src={image.image}
                        alt={image.name}
                        width={600}
                        height={800}
                        sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                        priority={ci === 0 && index < 4}
                        placeholder='blur'
                        blurDataURL='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
                        className='w-full h-auto block transition-transform duration-700 ease-in-out group-hover:scale-105'
                      />

                      {/* Desktop: hover overlay */}
                      <div className='absolute inset-0 bg-black/65 hidden md:flex flex-col items-center justify-center gap-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                        {image.name && (
                          <p className='text-xs tracking-[0.25em] text-white/90 px-6 text-center leading-relaxed'>
                            {image.name.toUpperCase()}
                          </p>
                        )}
                        <div className='flex gap-4'>
                          {safeUrl(image.store_link) && (
                            <a href={safeUrl(image.store_link)} target='_blank' rel='noopener noreferrer'
                              className='flex items-center justify-center w-10 h-10 border border-white/40 text-white/80 hover:bg-white hover:text-black hover:border-white transition-all duration-300'>
                              <FaShoppingCart className='text-sm' />
                            </a>
                          )}
                          {safeUrl(image.ig_link) && (
                            <a href={safeUrl(image.ig_link)} target='_blank' rel='noopener noreferrer'
                              className='flex items-center justify-center w-10 h-10 border border-white/40 text-white/80 hover:bg-white hover:text-black hover:border-white transition-all duration-300'>
                              <FaInstagram className='text-sm' />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Mobile: always-visible gradient strip at bottom */}
                      <div className='absolute bottom-0 left-0 right-0 md:hidden flex items-end justify-between px-2 pt-8 pb-2 bg-gradient-to-t from-black/80 to-transparent'>
                        {image.name && (
                          <span className='text-[0.65rem] tracking-[0.1em] text-white/65 truncate mr-2 leading-none'>
                            {image.name.toUpperCase()}
                          </span>
                        )}
                        <div className='flex gap-1.5 flex-shrink-0'>
                          {safeUrl(image.store_link) && (
                            <a href={safeUrl(image.store_link)} target='_blank' rel='noopener noreferrer'
                              className='flex items-center justify-center w-7 h-7 bg-black/60 border border-white/25 text-white/75'>
                              <FaShoppingCart className='text-[0.6rem]' />
                            </a>
                          )}
                          {safeUrl(image.ig_link) && (
                            <a href={safeUrl(image.ig_link)} target='_blank' rel='noopener noreferrer'
                              className='flex items-center justify-center w-7 h-7 bg-black/60 border border-white/25 text-white/75'>
                              <FaInstagram className='text-[0.6rem]' />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default ProductsSection

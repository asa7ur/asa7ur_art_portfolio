'use client'

import { FaInstagram, FaShoppingCart } from 'react-icons/fa'
import { CldImage } from 'next-cloudinary'
import Sidebar from './Sidebar'

const ContentSection = ({ onShowOverlay }) => {
  return (
    <section className='flex flex-col md:flex-row'>

      {/* Sidebar — hidden on mobile via its own class (hidden md:flex) */}
      <Sidebar />

      {/*
        Grid on md+: 3 shared rows (auto / 1fr / auto) across both columns
        so the ticker aligns with the GARIK header, both images fill the same
        1fr band, and the right spacer mirrors the /96 footer height.
        Mobile: plain flex-col; order-* props preserve the current visual order.
      */}
      <div className='flex-1 flex flex-col md:grid md:grid-cols-[60%_40%] lg:grid-cols-[65%_35%] md:grid-rows-[auto_1fr_auto] md:h-full'>

        {/* GARIK header — mobile order 1, grid col 1 row 1 */}
        <div className='order-1 md:col-start-1 md:row-start-1 content-garik flex justify-between items-baseline px-5 md:px-6 pt-5 pb-4 border-b border-neutral-200'>
          <h1 className='text-4xl tracking-[0.08em]'>GARIK</h1>
          <div className='text-right text-[0.68rem] leading-relaxed tracking-[0.22em] text-neutral-400'>
            ASA7UR© {new Date().getFullYear()} <br /> MADE WITH PASSION
          </div>
        </div>

        {/* John Wick image — mobile order 2, grid col 1 row 2 */}
        <div className='order-2 md:col-start-1 md:row-start-2 h-[62vw] md:h-full overflow-hidden'>
          <CldImage
            src='John_Wick_pvlezn'
            alt='John Wick'
            width={900}
            height={1200}
            sizes='(max-width: 768px) 100vw, 65vw'
            priority
            className='w-full h-full object-cover object-top'
          />
        </div>

        {/* Ticker — mobile order 3, grid col 2 row 1 */}
        <div className='order-3 md:col-start-2 md:row-start-1 h-12 md:h-auto overflow-hidden whitespace-nowrap bg-black text-white text-[2.2rem] md:text-[3rem] lg:text-[3.8rem] leading-none flex items-center flex-shrink-0'>
          <span
            className='inline-block'
            style={{ animation: 'loop 20s linear infinite', paddingLeft: '110%' }}
          >
            37°23&apos;59.1&quot;N 5°59&apos;35.5&quot;W
          </span>
        </div>

        {/* Marilyn Monroe image — mobile order 4, grid col 2 rows 2-3 */}
        <div className='order-4 md:col-start-2 md:row-start-2 md:row-end-4 flex-1 min-h-[48vw] md:min-h-0 md:h-full overflow-hidden bg-black'>
          <CldImage
            src='Marilyn_Monroe_q9tjap'
            alt='Marilyn Monroe'
            width={600}
            height={900}
            sizes='(max-width: 768px) 100vw, 35vw'
            priority
            className='w-full h-full object-cover'
          />
        </div>

        {/* Desktop footer left (/96 + COLLECTION) — hidden mobile, grid col 1 row 3 */}
        <div className='content-bottom hidden md:flex md:col-start-1 md:row-start-3 items-end justify-between px-6 py-5 border-t border-neutral-200'>
          <div className='leading-none'>
            <h1 className='text-[2.5rem] tracking-[0.05em]'>/96</h1>
            <h1 className='text-[2.5rem] tracking-[0.05em]'>ASATRYAN</h1>
          </div>
          <button
            onClick={onShowOverlay}
            className='group relative overflow-hidden border border-black px-9 py-4 tracking-[0.25em] text-sm cursor-pointer bg-transparent font-[inherit] flex items-center gap-3 flex-shrink-0 self-end'
            aria-label='View collection'
          >
            <span className='absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-in-out' />
            <span className='relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-3'>
              <span className='collection-arrow'>↑</span>
              COLLECTION
              <span className='collection-arrow'>↑</span>
            </span>
          </button>
        </div>


        {/* Mobile footer — hidden on desktop, no content-bottom class (GSAP doesn't touch it) */}
        <div className='order-5 flex md:hidden flex-col w-full border-t border-neutral-200'>

          {/* COLLECTION — dominant black CTA */}
          <button
            onClick={onShowOverlay}
            className='group relative overflow-hidden bg-black w-full px-8 py-8 cursor-pointer font-[inherit] flex items-center gap-5 text-white'
            aria-label='View collection'
          >
            <span className='absolute inset-0 bg-white scale-x-0 group-active:scale-x-100 origin-left transition-transform duration-500 ease-in-out' />
            <span className='relative z-10 flex-1' />
            <span className='relative z-10 tracking-[0.4em] text-sm flex items-center gap-4 transition-colors duration-300 group-active:text-black'>
              <span className='collection-arrow'>↑</span>
              COLLECTION
              <span className='collection-arrow'>↑</span>
            </span>
            <span className='relative z-10 flex-1' />
          </button>

          {/* /96 ASATRYAN + socials */}
          <div className='flex items-center justify-between px-6 py-5'>
            <a
              href='https://www.etsy.com/shop/ASA7URSHOP'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center justify-center w-11 h-11 border border-neutral-200 text-neutral-500 transition-colors active:bg-neutral-100'
            >
              <FaShoppingCart className='text-sm' />
            </a>
            <span className='text-[0.65rem] tracking-[0.2em] text-neutral-400'>/96 ASATRYAN</span>
            <a
              href='https://www.instagram.com/byasa7ur/'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center justify-center w-11 h-11 border border-neutral-200 text-neutral-500 transition-colors active:bg-neutral-100'
            >
              <FaInstagram className='text-sm' />
            </a>
          </div>

        </div>

      </div>
    </section>
  )
}

export default ContentSection

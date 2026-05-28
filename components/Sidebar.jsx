'use client'

import { FaInstagram, FaShoppingCart } from 'react-icons/fa'

const Sidebar = () => {
  return (
    <div className='sidebar hidden md:flex flex-col justify-between items-center w-12 bg-black text-white h-full py-6 opacity-0 flex-shrink-0 border-r border-white/10'>

      <a
        href='https://www.etsy.com/shop/ASA7URSHOP'
        target='_blank'
        rel='noopener noreferrer'
        className='group flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:bg-white/10'
      >
        <FaShoppingCart className='text-sm transition-transform duration-300 group-hover:scale-110' />
      </a>

      <div className='flex flex-col items-center gap-3'>
        <div className='w-px h-8 bg-white/20' />
        <span className='-rotate-90 text-[0.45rem] tracking-[0.45em] whitespace-nowrap select-none text-white/60'>
          ASA7UR
        </span>
        <div className='w-px h-8 bg-white/20' />
      </div>

      <a
        href='https://www.instagram.com/byasa7ur/'
        target='_blank'
        rel='noopener noreferrer'
        className='group flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:bg-white/10'
      >
        <FaInstagram className='text-sm transition-transform duration-300 group-hover:scale-110' />
      </a>
    </div>
  )
}

export default Sidebar

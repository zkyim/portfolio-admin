"use client"
import React from 'react'
import { CurrentUser } from './CurrentUser'
import MobileSidebar from '../sidebar/MobileSidebar'

const Navbar = () => {
  return (
    <div className='bg-muted w-full h-[70px] flex items-center border-b border-muted-foreground/20 shadow-md shadow-primary/5  justify-between py-3 px-6'>
      <div>
        <MobileSidebar />
      </div>  
      <CurrentUser />
    </div>
  )
}

export default Navbar

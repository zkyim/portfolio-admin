"use client";
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
  } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { useLanguage } from '@/store/use-language'
  
const MobileSidebar = () => {
  const { isEnglish } = useLanguage();
  return (
    <Sheet>
      <SheetTrigger className='lg:hidden p-1 border-transparent'>
        <Menu className='h-5 w-5'/>
      </SheetTrigger>
      <SheetContent className='p-0' side={isEnglish ? 'left' : 'right'}>
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar

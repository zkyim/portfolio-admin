"use client"
import { Dumbbell, NotepadText, School } from 'lucide-react'
import React from 'react'
import { CardInfo } from './_components/CardInfo'

const page = () => {
  return (
    <div className='flex flex-col gap-y-4 pt-10'>
      <CardInfo 
        label="Education" icon={School} 
        href="/management/education"  
      />
      <CardInfo 
        label="Skills" 
        icon={Dumbbell} 
        href="/management/skills"  
      />
      <CardInfo 
        label="Projects" 
        icon={NotepadText} 
        href="/management/projects"  
        />
    </div>
  )
}

export default page

"use client";
import { cn } from '@/lib/utils';
import React from 'react'

import { Dancing_Script } from "next/font/google"

interface LogoProps {
    box?: boolean;
}

const font = Dancing_Script({
    subsets: ['latin'],
    weight: ["500"]
})

export const Logo = ({
    box
}: LogoProps) => {
  return (
    <div>
        <div className={cn('relative px-5 py-3 mx-auto',)}>
            <span className={cn('text-4xl font-bold', font.className)}>Atlas</span>
            {box && (
                <>
                    <div className='absolute top-1 right-1 bg-transparent border-2 border-primary border-b-transparent border-l-transparent w-5 h-5'/>
                    <div className='absolute bottom-1 left-1 bg-transparent border-2 border-primary  border-t-transparent border-r-transparent w-5 h-5'/>
                </>
            )}
        </div>
    </div>
  )
}

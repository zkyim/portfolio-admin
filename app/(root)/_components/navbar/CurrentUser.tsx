import { auth, currentUser } from '@clerk/nextjs/server'
import Image from 'next/image';
import React from 'react'

import { Skeleton } from '@/components/ui/skeleton';
import { SignedOut, UserButton, useUser } from '@clerk/nextjs';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, UserCog } from 'lucide-react';

export const CurrentUser = () => {
  const { user } = useUser ();
  if (!user) return null;
  return (
    <div className='rounded-3xl py-1 px-1 pl-1 border border-muted-foreground/20 flex flex-row-reverse items-center gap-x-1'>
      <UserButton afterSignOutUrl='/sign-in'/>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu className='w-4 h-4 m-0.5'/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel >My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='w-[200px] cursor-pointer flex gap-x-2 py-2 px-3'> <UserCog className='h-5 w-5'/> Protfolio</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const CurrentUserSkeleton = () => {
    return (
        <div className='rounded-3xl py-1 px-1'>
            <Skeleton className='w-10 h-10 rounded-full'/>
        <div>
          <Menu className='mx-2 w-5 h-5'/>
        </div>
      </div>
    )
}
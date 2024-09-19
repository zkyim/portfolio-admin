import { cn } from '@/lib/utils';
import { CircleAlert, CircleCheck, CircleX } from 'lucide-react';
import React from 'react'

interface BannerProps {
    type: "succes" | "error" | "warning";
    label: string;
}

export const Banner = ({
    type,
    label
}: BannerProps) => {
    const isSucces = type === "succes";
    const isError = type === "error";
    const isWarning = type === "warning";
  return (
    <div className={cn("flex items-center gap-3 py-2 px-4 rounded-lg",isSucces && "bg-emerald-200/90", isError && "bg-rose-200", isWarning && "bg-amber-100/80")} >
      <span className='p-2'>
        {isSucces && <CircleCheck className='text-emerald-800 w-8 h-8'/>}
        {isWarning && <CircleAlert className="text-amber-400 w-8 h-8"/>}
        {isError && <CircleX className="text-rose-600 w-8 h-8"/>}
      </span>
      <p>
        {label}
      </p>
    </div>
  )
}

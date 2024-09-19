
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { useTranslation } from 'react-i18next'

interface RouteProps {
    label: string;
    href: string;
    icon: LucideIcon;
    isActive: boolean;
    className?: string;
    isChild?: boolean;
    isParint?: boolean;
    isEnglish?: boolean;
}

const Route = ({ label, href, icon: Icon, isActive, className, isChild, isParint, isEnglish = true }: RouteProps) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <Link href={href}>
        <div 
          className={cn('relative group w-full flex items-center py-3 px-1 cursor-pointer text-muted-foreground',
            !isParint && isActive && "bg-primary/5",
            className,
            isChild && "px-8"
          )}
        >
          <span className='px-3'>
            <Icon strokeWidth={1.5} className={cn('w-6 h-6 group-hover:text-primary/60', isActive && "")}/>
          </span>
          <span className={cn('leading-7 tracking-wide group-hover:text-primary/90 font-medium', isActive && "text-primary/90")}>{t(label)}</span>
          <div className={cn(!isChild && "absolute inset-0 w-1 bg-muted-foreground/25 group-hover:bg-muted-foreground/40 h-full", isActive && "bg-primary group-hover:bg-primary")}/>
          <div className={cn(isChild && "absolute top-1/2 left-5 -translate-y-1/2 w-2 h-2 rounded-full bg-muted-foreground/25 group-hover:bg-muted-foreground/40", !isEnglish && "right-5", isActive && "bg-primary group-hover:bg-primary")}/>
        </div>
      </Link>
    </>
  )
}

export default Route

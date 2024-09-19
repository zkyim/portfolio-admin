"use client";
import React from 'react'
import { Skeleton } from './ui/skeleton'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link';
import { useLanguage } from '@/store/use-language';
import { useTranslation } from 'react-i18next';

interface GoBackProps {
    label: string;
    href: string;
}

export const GoBack = ({
    label,
    href
}: GoBackProps) => {
  const { isEnglish } = useLanguage();
  const { t } = useTranslation();
  return (
    <Link href={href}>    
      <div className='flex items-center gap-3 py-7'>
        {isEnglish ? (
          <ChevronLeft className='w-6 h-6'/>
        ) : (
          <ChevronRight className='w-6 h-6'/>
        )}
        <span className='text-lg font-semibold'>{t(label)}</span>
      </div>
    </Link>
  )
}

export const GoBackSkeleton = () => {
  return (
    <Skeleton className='h-16 w-32'/>
  )
}

"use client";
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/store/use-language';
import { ChevronLeft, ChevronRight, LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useTranslation } from 'react-i18next';

interface CardInfoProps {
    label: string;
    icon: LucideIcon;
    href: string;
}

export const CardInfo = ({label, href, icon: Icon}: CardInfoProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(href);
  }
  const { t } = useTranslation();
  const { isEnglish } = useLanguage();
  return (
    <Card onClick={handleClick} className='flex items-center border-muted-foreground/20 bg-muted gap-3 sm:gap-x-6 px-5 sm:px-7 w-full py-3 sm:py-5 shadow-lg shadow-primary/5 border cursor-pointer'>
      <Icon strokeWidth={1.5} className='w-10 h-10 text-primary'/>
      <div className='flex-1 flex flex-col'>
        <span className='font-semibold'>{t(label)}</span>
        <span className='font-normal text-muted-foreground md:text-sm'>{t("Mante_message", {name: t(label)})}</span>
      </div>
      {isEnglish ? <ChevronRight className='w-6 h-6' /> : <ChevronLeft className='w-6 h-6' />}
    </Card>
  )
}

export const CardInfoSkeleton = () => {
  return (
    <Skeleton className='w-full h-10'/>
  )
}

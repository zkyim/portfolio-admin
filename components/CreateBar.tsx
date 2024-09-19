"use client";
import React from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { useTranslation } from 'react-i18next'

export const CreateBar = ({
    label,
    href,
}: {
    label: string,
    href: string,
}) => {
  const { t } = useTranslation();
  return (
    <>
        <div className='flex items-center justify-between px-6 py-3'>
            <div className='flex gap-3 items-center'>
            <div className='flex flex-col'>
                <span className='font-semibold text-lg'>{t("Create")} {t(label)}</span>
            </div>
            </div>
            <Link href={href}>
            <Button variant={'default'} className='font-normal py-1 px-3 flex gap-x-1'>
                <Plus className="w-5 h-5"/>
                {t("Create")}
            </Button>
            </Link>
        </div>
        <Separator />
    </>
  )
}

export const CreateBarSkeleton = () => {
    return (
        <>
            <div className='flex justify-between px-6 py-3'>
                <Skeleton className='w-20 h-8' />
                <Skeleton className='w-12 h-6 rounded-md' />
            </div>
            <Separator />
        </>
    )
}
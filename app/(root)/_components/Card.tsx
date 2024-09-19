"use client";
import React from 'react'
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from 'react-i18next';
interface CardProps {
    label: string;
    statistic: number;
    icon: LucideIcon;
}
export const CardComponent = ({
    label, 
    statistic, 
    icon: Icon
}: CardProps) => {
    const { t } = useTranslation();
    return (
        <Card className="flex bg-muted justify-between py-4 px-7 shadow-lg shadow-primary/5 border-muted-foreground/20">
            <div className=" flex flex-col py-2 justify-center">
                <span className="text-muted-foreground font-medium pb-1">{t(label)}</span>
                <span className="text-xl">{statistic}</span>
            </div>
            <Icon strokeWidth={1.5} className="w-12 h-12 text-primary" />
        </Card>
    )
}

export const CardComponentSkeleton = () => {
    return (
        <Skeleton className='w-full h-24' />
    )
}

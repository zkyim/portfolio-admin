"use client";
import { Button } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form';
import { Checkbox } from '@radix-ui/react-checkbox';
import axios from 'axios';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

interface ImagesContainerProps {
    id: string;
    projectId: string;
    src: string;
    onDelete: (e: any, id: string) => void;
    isChecked?: boolean;
    isMain?: boolean;
}

const ImagesContainer = ({
    id,
    projectId,
    src,
    onDelete,
    isChecked,
    isMain
}: ImagesContainerProps) => {
    const { t } = useTranslation();
    const hadleDelete = (e: any) => {
        onDelete(e, id)
    }
  return (
    <>
        <div className="aspect-video w-[150px] relative">
            {!isChecked && isMain && <div className='absolute -top-2 right-1/2 translate-x-1/2 w-1/2 h-fit rounded-md bg-primary z-10 text-white text-center font-semibold text-sm shadow-xl shadow-primary/20'>Main</div>}
            <div className="w-full h-full relative rounded-md overflow-hidden border">
                <Image 
                    alt="image"
                    src={src}
                    fill
                />
            </div>
            <Button type='button' variant={'destructive'} onClick={(e) => hadleDelete(e)} className="absolute inset-1 px-1 py-1.5 w-fit h-fit cursor-pointer rounded-md">
                <Trash className="w-4 h-4 text-white"/>
            </Button>
        </div>
    </>
  )
}

export default ImagesContainer

"use client";
import React, { useState } from 'react'
import TitleFrom from './TitleForm';
import DescriptionForm from './DescriptionForm';
import DateForm from './DateForm';
import { GoBack } from '@/components/GoBack';
import { ActionsBar } from '@/components/ActionsBar';
import { Education } from '@prisma/client';
import axios from 'axios';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

const PageContent = ({ data }: {data: Education}) => {
  const { t } = useTranslation();
  const [isPublic, setIsPublic] = useState(data.isPublic);
  const [isLoading, setIsLoading] = useState(false);
  const router =  useRouter();
  const handlePublish = () => {
    setIsLoading(true);
    axios.post(`/api/${data.id}/publish`, {type: "education", value: !isPublic})
    .then(() => {
      if (isPublic) {
        toast.success(t("Massege_Notpublished", {var: data.title}))
      }else {
        toast.success(t("Massege_Published", {var: data.title}))
      }
      setIsPublic(!isPublic)
    }).catch(() => {
      toast.error(t("Something went wrong"))
    }).finally(() => {setIsLoading(false); setIsPublic(!isPublic)})
  }
  const handleDelete = () => {
    axios.delete(`/api/education/${data.id}`)
    .then(() => {
      setIsLoading(true);
      toast.success(t("Massege_Deleted", {var: data.title}))
      router.push(`/management/education`);
    }).catch(() => {
      toast.error(t("Something went wrong"))
    }).finally(() => {setIsPublic(false); setIsLoading(false); setIsPublic(!isPublic)})
  }
  return (
    <>

      <GoBack label='Go back' href='/management/education'/>
      <ActionsBar isLoading={isLoading} isPublic={isPublic} onApi={handlePublish} onDelete={handleDelete}/>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <div className='space-y-6'>
          <TitleFrom
            id={data.id}
            value={data.title}
            label={'Title'}
          />
          <DescriptionForm
            id={data.id}
            value={data.description}
            label={'Description'}
          />
        </div>
        <div className='space-y-6'>
          <DateForm
            id={data.id}
            value={data.year}
            label={'Year of create'}
          />
        </div>
      </div>
    </>
  )
}

export default PageContent

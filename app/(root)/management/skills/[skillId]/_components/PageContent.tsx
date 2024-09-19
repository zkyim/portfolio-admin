"use client";
import React, { useState } from 'react'
import ToolForm from './ToolForm';
import { GoBack } from '@/components/GoBack';
import { ActionsBar } from '@/components/ActionsBar';
import { Skill } from '@prisma/client';
import axios from 'axios';
import { toast } from 'sonner';
import CategoryForm from './CategoryForm';
import PercentageForm from './PercentageForm';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

const PageContent = ({ data }: {data: Skill}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isPublic, setIsPublic] = useState(data.isPublic);
  const [isLoading, setIsLoading] = useState(false);
  const handlePublish = () => {
    setIsLoading(true);
    axios.post(`/api/${data.id}/publish`, {type: "skill", value: !isPublic})
    .then(() => {
      if (isPublic) {
        toast.success(t("Massege_Notpublished", {var: data.tool}))
      }else {
        toast.success(t("Massege_Published", {var: data.tool}))
      }
      setIsPublic(!isPublic)
    }).catch(() => {
      toast.error(t("Something went wrong"))
    }).finally(() => {setIsLoading(false)})
  }
  const handleDelete = () => {
    setIsLoading(true);
    axios.delete(`/api/skill/${data.id}`)
    .then(() => {
      toast.success(t("Massege_Deleted", {var: data.tool}))
      router.push(`/management/education`);
    }).catch(() => {
      toast.error(t("Something went wrong"))
    }).finally(() => {setIsLoading(false);})
  }
  return (
    <>
      <GoBack label='Go back' href='/management/skills'/>
      <ActionsBar isLoading={isLoading} isPublic={isPublic} onDelete={handleDelete} onApi={handlePublish}/>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <div className='space-y-6'>
          <ToolForm
            id={data.id}
            value={data.tool}
            label={'Tool'}
          />
          <CategoryForm
            id={data.id}
            value={data.category}
            label={'Category'}
          />
        </div>
        <div className='space-y-6'>
          <PercentageForm
            id={data.id}
            value={data.percentage}
            label={'Percentage'}
          />
        </div>
      </div>
    </>
  )
}

export default PageContent

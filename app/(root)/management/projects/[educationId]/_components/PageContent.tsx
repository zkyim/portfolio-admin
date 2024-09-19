"use client";
import React, { useState } from 'react'
import TitleFrom from './TitleForm';
import DescriptionForm from './DescriptionForm';
import DateForm from './DateForm';
import { GoBack } from '@/components/GoBack';
import { ActionsBar } from '@/components/ActionsBar';
import { Image, Project } from '@prisma/client';
import axios from 'axios';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import DemoForm from './DemoForm';
import GithubUrlForm from './GithubUrl';
import ImagesForm from './ImagesForm';
import TagsForm from './TagsForm';

const PageContent = ({ data, dataImages }: {data: Project, dataImages: Image[] | null}) => {
  const { t } = useTranslation();
  const [isPublic, setIsPublic] = useState(data.isPublic);
  const [isLoading, setIsLoading] = useState(false);
  const router =  useRouter();
  const handlePublish = () => {
    setIsLoading(true);
    axios.post(`/api/${data.id}/publish`, {type: "project", value: !isPublic})
    .then(() => {
      if (isPublic) {
        toast.success(t("Massege_Notpublished", {var: data.title}))
      }else {
        toast.success(t("Massege_Published", {var: data.title}))
      }
    }).catch(() => {
      toast.error(t("Something went wrong"))
    }).finally(() => {setIsLoading(false); setIsPublic(!isPublic)})
  }
  const handleDelete = () => {
    setIsLoading(true);
    axios.delete(`/api/project/${data.id}`)
    .then(() => {
      toast.success(t("Massege_Deleted", {var: data.title}))
      router.push(`/management/projects`);
    }).catch(() => {
      toast.error(t("Something went wrong"))
    }).finally(() => {setIsLoading(false)})
  }
  return (
    <>

      <GoBack label='Go back' href='/management/projects'/>
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
          <TagsForm 
            id={data.id}
            value={data.tools}
            label={t('Tools')}
          />
          <ImagesForm
            id={data.id}
            dataImages={dataImages}
          />
        </div>
        <div className='space-y-6'>
          <DateForm
            id={data.id}
            value={data.published_At}
            label={t('Publication date')}
          />
          <DemoForm
            id={data.id}
            value={data.demo}
            label={'Demo'}
          />
          <GithubUrlForm
            id={data.id}
            value={data.githubUrl}
            label={'GithubUrl'}
          />
        </div>

      </div>
    </>
  )
}

export default PageContent

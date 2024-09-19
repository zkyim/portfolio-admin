import { db } from '@/lib/db'
import React from 'react'
import PageContent from './_components/PageContent';


const EditEdutcationPage = async ({params}: {params: {educationId: string}}) => {
  const data = await db.project.findUnique({
    where: {
      id: params.educationId,
    },
  });
  const dataImages = await db.image.findMany({
    where: {
      projectId: params.educationId,
    }
  })
  if (!data) return null;
  return (
    <div className='h-full'>
      <PageContent data={data} dataImages={dataImages}/>
    </div>
  )
}

export default EditEdutcationPage

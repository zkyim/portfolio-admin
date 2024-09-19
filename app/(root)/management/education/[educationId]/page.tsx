import { db } from '@/lib/db'
import React from 'react'
import PageContent from './_components/PageContent';


const EditEdutcationPage = async ({params}: {params: {educationId: string}}) => {
  const data = await db.education.findUnique({
    where: {
      id: params.educationId,
    },
  });
  if (!data) return null;
  return (
    <div className='h-full'>
      <PageContent data={data}/>
    </div>
  )
}

export default EditEdutcationPage

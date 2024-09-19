import { db } from '@/lib/db'
import React from 'react'
import PageContent from './_components/PageContent';


const EditEdutcationPage = async ({params}: {params: {skillId: string}}) => {
  const data = await db.skill.findUnique({
    where: {
      id: params.skillId,
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

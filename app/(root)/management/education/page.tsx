import { columns } from "./_components/column"
import React from 'react'
import { CreateBar } from '../../../../components/CreateBar'
import { DataTable } from '../../../../components/DataTable'
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"

const page = async () => {
  const user = await currentUser()
  if (!user) return redirect('/');
  const data = await db.education.findMany();
  return (
    <div className='w-full h-full'>
      <CreateBar href="/management/education/create" label="Education"/>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default page

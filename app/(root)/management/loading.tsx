import React from 'react'
import { CardInfoSkeleton } from './_components/CardInfo'

const LoadingMangement = () => {
  return (
    <div className='flex flex-col gap-y-4 pt-10'>
      {[...Array(3)].map((_,i) => (
        <CardInfoSkeleton key={i}/>
      ))}
    </div>
  )
}

export default LoadingMangement

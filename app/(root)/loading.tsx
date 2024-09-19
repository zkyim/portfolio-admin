import React from 'react'
import { DataChartSkeleton } from './_components/DataChart'
import { CardComponentSkeleton } from './_components/Card'

const LoadingDashboard = () => {
  return (
    <div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-10">
        {[...Array(3)].map((_,i) => (
          <CardComponentSkeleton key={i}/>
        ))}
      </div>
      <DataChartSkeleton />
    </div>
  )
}

export default LoadingDashboard

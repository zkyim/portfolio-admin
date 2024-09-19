"use client"

import { Bar, BarChart, XAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2094f3",
  },
  mobile: {
    label: "Mobile",
    color: "#5eb5fd5c",
  },
} satisfies ChartConfig

export const DataChart = () => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[150px] max-w-[600px] mx-auto w-full">
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          className="shadow-chart"

        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar className="shadow-chart" dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar className="shadow-chart" dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export const DataChartSkeleton = () => {
  return (
    <Skeleton className="w-full h-32"/>
  )
}
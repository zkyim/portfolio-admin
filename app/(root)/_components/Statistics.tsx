"use client";
import React from 'react'
import { Dumbbell, School, SquareChartGantt } from "lucide-react";
import { CardComponent } from "../_components/Card";
interface StatisticsProps {
    ProjectStatistics: number;
    SkillStatistics: number;
    SchoolStatistics: number;
}
const Statistics = ({
    ProjectStatistics,
    SkillStatistics,
    SchoolStatistics,
}: StatisticsProps) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <CardComponent label="Projects" icon={SquareChartGantt} statistic={ProjectStatistics}/>
        <CardComponent label="Skills" icon={Dumbbell} statistic={SkillStatistics}/>
        <CardComponent label="Education" icon={School} statistic={SchoolStatistics}/>
    </div>
  )
}

export default Statistics

import { db } from "@/lib/db";
import { DataChart } from "./_components/DataChart";
import Statistics from "./_components/Statistics";


const page = async () => {
  const projectStatistics = await db.project.count();
  const skillStatistics = await db.skill.count();
  const schoolStatistics = await db.education.count();
  return (
    <div>
      <Statistics
        ProjectStatistics={projectStatistics}
        SkillStatistics={skillStatistics}
        SchoolStatistics={schoolStatistics}
      />
      <div className="overflow-y-auto pt-10">
        <DataChart />
      </div>
    </div>
  )
}
export default page;
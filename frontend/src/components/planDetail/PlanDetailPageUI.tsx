import DailyPlanDetail from './DailyPlanDetail'
import DailySchedule from './DailySchedule'

const PlanDetailPageUI = () => {
  return (
    <>
      <h1 className="text-center font-sans text-xl">여행 이름</h1>
      <DailySchedule />
      <DailyPlanDetail />
    </>
  )
}

export default PlanDetailPageUI

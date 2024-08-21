import DailySchedule from './DailySchedule'
import MenuTab from './MenuTab'

const PlanDetailPageUI = () => {
  return (
    <>
      <h1 className="text-center font-sans text-xl">여행 이름</h1>
      <DailySchedule />
      <MenuTab />
    </>
  )
}

export default PlanDetailPageUI

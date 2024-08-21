import MenuTab from './DailyPlanDetail'

const DailySchedule = () => {
  return (
    <>
      <div className="flex items-center justify-between font-sans text-xs">
        <div className="mx-1 flex h-8 w-8 items-center justify-center rounded-lg bg-pink-200 text-white">
          Day1 {/* 1일차, 2일차 ... */}
        </div>
        <div className="mx-1">2024.01.01 {/* 여행 날짜 */}</div>
        <div className="mx-1 ml-auto">일본 오키나와 {/* 여행 장소 */}</div>
      </div>
    </>
  )
}

export default DailySchedule

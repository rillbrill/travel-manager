import DaySection from '@/components/planDetail/DaySection'
import { dummyDays } from '@/constants'

function PlanDetailPage() {
  // TODO: get plan by id api call
  // TODO: get days list api call

  return (
    <div className="flex w-full flex-col gap-y-4 px-3 py-2 pb-4">
      <div className="flex flex-col items-center gap-y-3">
        <h2 className="text-2xl font-bold">여행명</h2>
        <div className="flex items-center gap-x-2">
          <span>💰 예상 경비:</span>
          <span>10,000,000원</span>
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        {dummyDays.map((day, index) => (
          <DaySection key={day.id} day={day} dayIndex={index + 1} />
        ))}
      </div>
    </div>
  )
}

export default PlanDetailPage

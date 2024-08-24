import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { fetchDays } from '@/api/Days'
import DaySection from '@/components/planDetail/DaySection'
import { dummyDays, dummyPlan } from '@/constants'
import { Day } from '@/types/plan'

function PlanDetailPage() {
  // TODO: get plan by id api call
  const { planName, planCountry, totalExpenses } = dummyPlan

  // TODO: get activity list api call
  const { id: planId } = useParams<string>()
  const [days, setDays] = useState<Day[]>([])

  useEffect(() => {
    const getDays = async () => {
      if (planId) {
        const data = await fetchDays(planId)
        setDays(data)
      }
    }
    getDays()
  }, [])

  return (
    <div className="relative flex w-full flex-col gap-y-4 px-3 py-2 pb-4">
      <div className="flex flex-col items-center gap-y-3">
        <h2 className="text-2xl font-bold">{planName}</h2>
        <div className="flex items-center gap-x-2">
          <span>💰 예상 경비:</span>
          <span>{totalExpenses.toLocaleString()}원</span>
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        {days.map((day, index) => (
          <DaySection
            key={day.id}
            day={day}
            dayIndex={index + 1}
            country={planCountry}
          />
        ))}
      </div>
    </div>
  )
}

export default PlanDetailPage

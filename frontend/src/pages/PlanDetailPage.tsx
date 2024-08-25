import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { plansApi } from '@/api/plans'
import { SvgLoadingSpinner } from '@/components/common'
import DaySection from '@/components/planDetail/DaySection'
import { usePending } from '@/hooks/usePending'
import { HttpStatusCodeEnum } from '@/types'
import { ActivitiesByPlanResDto, PlanResDto } from '@/types/plan'

function PlanDetailPage() {
  const [plan, setPlan] = useState<PlanResDto>()
  const [days, setDays] = useState<ActivitiesByPlanResDto>([])
  const { planId } = useParams()
  const { isPending, toggleIsPending } = usePending()

  useEffect(() => {
    const fetchData = async () => {
      toggleIsPending(true)
      const planRes = await plansApi.getPlanById(planId || '')
      const activitiesRes = await plansApi.getActivitiesByPlan(planId || '')
      if (
        planRes?.status === HttpStatusCodeEnum.OK &&
        activitiesRes?.status === HttpStatusCodeEnum.OK
      ) {
        setPlan(planRes.data)
        setDays(activitiesRes.data)
        toggleIsPending(false)
      }
    }

    fetchData()
  }, [])

  if (isPending || !plan) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <SvgLoadingSpinner className="fill-blue-500" />
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-y-4 px-3 py-2 pb-4">
      <div className="flex flex-col items-center gap-y-3">
        <h2 className="text-2xl font-bold">{plan.planName}</h2>
        <div className="flex items-center gap-x-2">
          <span>💰 예상 경비:</span>
          <span>{plan.totalExpenses.toLocaleString()}원</span>
        </div>
      </div>

      <div className="flex flex-col gap-y-4">
        {days.map((day, index) => (
          <DaySection
            key={day.id}
            planId={planId || ''}
            day={day}
            dayIndex={index + 1}
            country={plan.planCountry}
          />
        ))}
      </div>
    </div>
  )
}

export default PlanDetailPage

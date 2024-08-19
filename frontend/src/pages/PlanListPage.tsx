import { useEffect, useState } from 'react'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { BsPeopleFill } from 'react-icons/bs'
import { GiAirplaneArrival, GiAirplaneDeparture } from 'react-icons/gi'
import { PiMapPinAreaBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'

import { fetchPlans } from '@/api/plans.api'
import { Plan } from '@/models/plan.model'
import { routes } from '@/routes'
import { formatDate, formatNumber } from '@/utils/format'

function PlanListPage() {
  const [plans, setPlans] = useState<Plan[]>([])

  useEffect(() => {
    const getPlans = async () => {
      const plansData = await fetchPlans()
      setPlans(plansData)
    }

    getPlans()
  }, [])

  return (
    <div className="h-screen items-center justify-center">
      <ul className="w-full max-w-3xl space-y-4">
        {plans.map((plan) => (
          <li
            key={plan.id}
            className="mx-2 mt-3 rounded-2xl bg-primary-50 p-4 text-base shadow-lg lg:text-sm"
          >
            <Link to={routes.plan}>
              <h2 className="mb-2 text-xl font-semibold lg:text-lg">
                {plan.plan_name}
              </h2>
              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <GiAirplaneDeparture size="20" color="#96948f" />
                  <p>출발일 : {formatDate(plan.start_date)}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <GiAirplaneArrival size="20" color="#96948f" />
                  <p>도착일 : {formatDate(plan.end_date)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <PiMapPinAreaBold size="18" color="#f00" />{' '}
                <p>여행지 : {plan.plan_country}</p>
              </div>
              <div className="flex items-center space-x-2">
                <BsPeopleFill size="18" /> <p>인원 : {plan.head_count}명</p>
              </div>
              <div className="mt-2 flex items-center justify-end space-x-2">
                <BiMoneyWithdraw size="20" color="#a88b42" />{' '}
                <p>예상 경비 : {formatNumber(plan.total_expenses)}원</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PlanListPage

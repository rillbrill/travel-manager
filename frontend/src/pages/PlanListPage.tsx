import { useEffect, useState } from 'react'
import { BiMoneyWithdraw } from 'react-icons/bi'
import { BsPeopleFill } from 'react-icons/bs'
import { GiAirplaneArrival, GiAirplaneDeparture } from 'react-icons/gi'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import { PiMapPinAreaBold } from 'react-icons/pi'
import { RiArrowRightDoubleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import { plansApi } from '@/api/plans'
import { PlanInfo } from '@/components/addPlan/PlanInfo'
import { Plan } from '@/models/plan.model'
import { routes } from '@/routes'
import { formatDate, formatNumber } from '@/utils/format'

function PlanListPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const plansPerPage = 5

  const indexOfLastPlan = currentPage * plansPerPage
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage
  const currentPlans = plans.slice(indexOfFirstPlan, indexOfLastPlan)
  const totalPages = Math.ceil(plans.length / plansPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  useEffect(() => {
    const getPlans = async () => {
      const plansData = await plansApi.fetchPlans()

      setPlans(plansData)
    }

    getPlans()
  }, [])

  return (
    <div className="flex flex-1 flex-col items-center gap-y-3">
      <ul className="w-full max-w-3xl space-y-2.5">
        {currentPlans.map((plan) => (
          <div key={plan.id}>
            <li
              className={`relative mx-4 rounded-2xl p-4 text-sm shadow-lg ${
                plan.plan_end ? 'bg-gray-300' : 'bg-primary-50'
              }`}
            >
              {plan.plan_end && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="pointer-events-none rotate-12 transform text-4xl font-bold uppercase text-red-500 opacity-60">
                    END
                  </span>
                </div>
              )}
              <Link to={`${routes.plans}/${plan.id}`}>
                <h2 className="mb-1.5 text-base font-semibold">
                  {plan.plan_name}
                </h2>
                <div className="flex justify-between">
                  <div className="mb-1.5 flex items-center space-x-2">
                    <GiAirplaneDeparture size="20" color="#96948f" />
                    <p>{formatDate(plan.start_date)}</p>
                  </div>
                  <div className="mb-1.5 flex items-center">
                    <RiArrowRightDoubleFill size="20" />
                  </div>
                  <div className="mb-1.5 flex items-center space-x-2">
                    <GiAirplaneArrival size="20" color="#96948f" />
                    <p>{formatDate(plan.end_date)}</p>
                  </div>
                </div>
                <PlanInfo
                  icon={<PiMapPinAreaBold size="18" color="#f00" />}
                  title="여행지"
                  content={plan.plan_country}
                />
                <PlanInfo
                  icon={<BsPeopleFill size="18" />}
                  title="인원"
                  content={`${plan.head_count}명`}
                />
                <div className="mt-1.5 flex items-center justify-end space-x-4">
                  <div className="flex space-x-1">
                    <BiMoneyWithdraw size="20" color="#a88b42" />
                    <p className="font-semibold">예상 경비</p>
                  </div>
                  <p>{formatNumber(plan.total_expenses)}원</p>
                </div>
              </Link>
            </li>
          </div>
        ))}
      </ul>
      <div className="flex space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="rounded-md bg-gray-200 px-4 py-2 disabled:opacity-50"
        >
          <MdNavigateBefore size="20" />
        </button>
        <span className="px-4 py-2">{`${currentPage} / ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="rounded-md bg-gray-200 px-4 py-2 disabled:opacity-50"
        >
          <MdNavigateNext size="20" />
        </button>
      </div>
    </div>
  )
}

export default PlanListPage

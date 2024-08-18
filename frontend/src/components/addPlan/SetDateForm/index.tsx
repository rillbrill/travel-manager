import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import Button from '@/components/common/Button'
import { routes } from '@/routes'
import { AddPlanStepEnum } from '@/types'

function SetDateForm() {
  const navigate = useNavigate()

  return (
    <form className="flex w-full flex-1 flex-col justify-between">
      <div></div>

      <div className="flex w-full items-center justify-between">
        <Button
          className="w-40 border border-blue-500 bg-transparent text-gray-800"
          isFull={false}
          onClick={() =>
            navigate(`${routes.addPlan}/${AddPlanStepEnum.SetInfo}`)
          }
        >
          <FiChevronLeft className="text-lg text-blue-500" />
          <span className="text-blue-500">이전 단계로</span>
        </Button>
        <Button
          className="w-40"
          isFull={false}
          onClick={() =>
            navigate(`${routes.addPlan}/${AddPlanStepEnum.SetPlace}`)
          }
        >
          <span>다음 단계로</span>
          <FiChevronRight className="text-lg" />
        </Button>
      </div>
    </form>
  )
}

export default SetDateForm

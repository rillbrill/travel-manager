import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import Button from '@/components/common/Button'
import { routes } from '@/routes'
import { AddPlanStepEnum } from '@/types'

function SetPlaceForm() {
  const navigate = useNavigate()

  return (
    <div className="flex w-full flex-1 flex-col justify-between">
      <div className="flex flex-col gap-y-4">
        <Button shape="input">여행지 선택하기</Button>
      </div>

      <div className="flex w-full items-center justify-between">
        <Button
          className="w-40 border border-blue-500 bg-transparent text-gray-800"
          isFull={false}
          onClick={() =>
            navigate(`${routes.addPlan}/${AddPlanStepEnum.SetDate}`)
          }
        >
          <FiChevronLeft className="text-lg text-blue-500" />
          <span className="text-blue-500">이전 단계로</span>
        </Button>
        <Button
          className="w-40"
          isFull={false}
          // TODO
          onClick={() => {}}
        >
          <span>완료하기</span>
          <FiChevronRight className="text-lg" />
        </Button>
      </div>
    </div>
  )
}

export default SetPlaceForm

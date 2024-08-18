import { FiChevronRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { routes } from '@/routes'
import { AddPlanStepEnum } from '@/types'

function SetInfoForm() {
  const navigate = useNavigate()

  return (
    <form className="flex w-full flex-1 flex-col justify-between">
      <div className="flex flex-col gap-y-4">
        <Input
          type="text"
          label="여행명"
          placeholder="여행명을 입력해주세요"
          // TODO
          onChange={() => {}}
        />
        <Input
          type="number"
          label="총 인원"
          // TODO
          onChange={() => {}}
        />
      </div>

      <Button
        onClick={() => navigate(`${routes.addPlan}/${AddPlanStepEnum.SetDate}`)}
      >
        <span>다음 단계로</span>
        <FiChevronRight className="text-lg" />
      </Button>
    </form>
  )
}

export default SetInfoForm

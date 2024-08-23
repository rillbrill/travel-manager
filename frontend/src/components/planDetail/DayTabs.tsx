import { FiPlusSquare } from 'react-icons/fi'

import { DaysTabEnum } from '@/types/plan'
import { cn } from '@/utils/cn'

type Props = {
  currentTab: DaysTabEnum
  changeCurrentTab: (tab: DaysTabEnum) => void
  openForm: () => void
}

function DayTabs({ currentTab, changeCurrentTab, openForm }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex">
        {Object.values(DaysTabEnum).map((tab) => (
          <button
            key={tab}
            className={cn([
              'p-2 text-sm',
              currentTab === tab
                ? 'border-b-2 border-primary-default font-bold text-primary-default'
                : 'text-gray-600',
            ])}
            onClick={() => changeCurrentTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <button onClick={openForm}>
        <FiPlusSquare className="text-2xl text-primary-default" />
      </button>
    </div>
  )
}

export default DayTabs

import { useEffect, useMemo } from 'react'

import { dayCategories } from '@/constants'
import { DayCategoryEnum, DaysTabEnum } from '@/types/plan'
import { cn } from '@/utils/cn'

type Props = {
  currentTab: DaysTabEnum
  selectedCategory: DayCategoryEnum | null
  onClick: (category: DayCategoryEnum) => void
}

function CategoryList({ currentTab, selectedCategory, onClick }: Props) {
  const isExpenseTab = currentTab === DaysTabEnum.Expense
  const categories = useMemo(
    () =>
      isExpenseTab
        ? dayCategories.filter((elem) => elem.name === DayCategoryEnum.Etc)
        : dayCategories,
    [isExpenseTab]
  )

  useEffect(() => {
    if (isExpenseTab) {
      onClick(DayCategoryEnum.Etc)
    }
  }, [isExpenseTab])

  return (
    <div className="flex w-full flex-wrap items-center gap-1">
      {categories.map((category) => (
        <button
          type="button"
          key={category.name}
          className={cn([
            'rounded-md px-2 py-1 text-center text-xs',
            category.color,
          ])}
          onClick={() => onClick(category.name)}
        >
          {category.name} {selectedCategory === category.name && '✅'}
        </button>
      ))}
    </div>
  )
}

export default CategoryList

import { dayCategories } from '@/constants'
import { DayCategoryEnum } from '@/types/plan'
import { cn } from '@/utils/cn'

type Props = {
  selectedCategory: DayCategoryEnum | null
  onClick: (category: DayCategoryEnum) => void
}

function CategoryList({ selectedCategory, onClick }: Props) {
  return (
    <div className="flex w-full flex-wrap items-center gap-1">
      {dayCategories.map((category) => (
        <button
          key={category.name}
          type="button"
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

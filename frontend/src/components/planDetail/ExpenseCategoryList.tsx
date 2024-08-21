import ButtonItem from '../common/ButtonItem'
import { CategoryType } from './schedule.model'

const ExpenseCategories: CategoryType[] = [
  { name: '교통비', color: '#D3D3F3' },
  { name: '숙박비', color: '#B0E2AB' },
  { name: '식비', color: '#EFD9A0' },
  { name: '관광', color: '#F9AEAE' },
  { name: '쇼핑', color: '#9EDDF1' },
  { name: '기타', color: '#DFDFDF' },
]

type ExpenseCategoryListProps = {
  setCategory: React.Dispatch<React.SetStateAction<CategoryType>>
}

const ExpenseCategoryList: React.FC<ExpenseCategoryListProps> = ({
  setCategory,
}) => {
  return (
    <div className="my-3 mt-5 flex items-center space-x-4">
      <span className="font-sans text-xs">카테고리</span>
      <div>
        {ExpenseCategories.map((category, index) => (
          <ButtonItem
            key={index}
            name={category.name}
            color={category.color}
            onClick={() =>
              setCategory({ name: category.name, color: category.color })
            }
          />
        ))}
      </div>
    </div>
  )
}

export default ExpenseCategoryList

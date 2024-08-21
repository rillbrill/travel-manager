import ButtonItem from '../common/ButtonItem'

type CategoryType = {
  name: string
  color: string
}

const categories: CategoryType[] = [
  { name: '활동', color: '#A9C6F1' },
  { name: '숙소', color: '#90BA8A' },
  { name: '아침', color: '#A3D4CC' },
  { name: '점심', color: '#FEE2E2' },
  { name: '저녁', color: '#FEF08A' },
  { name: '카페', color: '#D9D9D9' },
]

type CategoryListProps = {
  setCategory: React.Dispatch<React.SetStateAction<CategoryType>>
}

const CategoryList: React.FC<CategoryListProps> = ({ setCategory }) => {
  return (
    <div className="flex items-center space-x-4">
      <span className="s-12 font-semibold">카테고리</span>
      <div className="space-x-1">
        {categories.map((category, index) => (
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

export default CategoryList

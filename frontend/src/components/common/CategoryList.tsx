type CategoryType = {
  name: string
  color: string
}

type Props = {
  category: CategoryType
}

const CategoryButton = ({ category }: Props) => {
  const { name, color } = category

  return (
    <button
      className="mx-1 rounded-lg px-2 py-2 font-sans text-xs"
      style={{ backgroundColor: color }}
    >
      {name}
    </button>
  )
}

const CategoryList = () => {
  const categories: CategoryType[] = [
    { name: '활동', color: '#A9C6F1' },
    { name: '숙소', color: '#90BA8A' },
    { name: '아침', color: '#A3D4CC' },
    { name: '점심', color: '#FEE2E2' },
    { name: '저녁', color: '#FEF08A' },
    { name: '카페', color: '#D9D9D9' },
  ]

  return (
    <div className="flex items-center space-x-4">
      <span className="font-sans text-xs">카테고리</span>
      <div>
        {categories.map((category, index) => (
          <CategoryButton key={index} category={category} />
        ))}
      </div>
    </div>
  )
}

export default CategoryList

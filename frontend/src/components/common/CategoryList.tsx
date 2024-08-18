type Props = {
  name: string
  color: string
}

type CategoryType = {
  name: string
  color: string
}

const CategoryItemButton = ({ name, color }: Props) => {
  const categoryItemStyleClass = `mx-1 rounded-lg px-2 py-2 font-sans text-xs bg-${color}`

  return <button className={categoryItemStyleClass}>{name}</button>
}

const categories: CategoryType[] = [
  { name: '활동', color: 'blue-300' },
  { name: '숙소', color: 'violet-300' },
  { name: '아침', color: 'teal-300' },
  { name: '점심', color: 'yellow-200' },
  { name: '저녁', color: 'indigo-300' },
  { name: '카페', color: 'stone-400' },
]

const CategoryList = () => {
  return (
    <div className="my-3 flex items-center space-x-4">
      <span className="font-sans text-xs">카테고리</span>
      <div>
        {categories.map((category, index) => (
          <CategoryItemButton
            key={index}
            name={category.name}
            color={category.color}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoryList

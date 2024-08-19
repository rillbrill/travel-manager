import { useState } from 'react'

import CategoryList from './CategoryList'
import LocationInputForm from './LocationInputForm'
import { CategoryType } from './schedule.model'

const AddSchedule = () => {
  const [category, setCategory] = useState<CategoryType>({
    name: '',
    color: '',
  })

  return (
    <>
      <CategoryList setCategory={setCategory} />
      <LocationInputForm category={category} />
    </>
  )
}

export default AddSchedule

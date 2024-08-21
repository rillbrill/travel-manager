import { useState } from 'react'

import CategoryList from './CategoryList'
import LocationInputForm from './LocationInputForm'
import { CategoryType } from './schedule.model'

const AddScheduleForm = () => {
  const [category, setCategory] = useState<CategoryType>({
    name: '',
    color: '',
  })

  return (
    <>
      <div className="mx-3 my-3 space-y-2">
        <CategoryList setCategory={setCategory} />
        <LocationInputForm category={category} />
      </div>
    </>
  )
}

export default AddScheduleForm

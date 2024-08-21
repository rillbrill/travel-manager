import { useState } from 'react'

import ExpenseCategoryList from './ExpenseCategoryList'
import MemoInputForm from './MemoInputForm'
import { CategoryType } from './schedule.model'

const AddExpense = () => {
  const [category, setCategory] = useState<CategoryType>({
    name: '',
    color: '',
  })

  return (
    <>
      <ExpenseCategoryList setCategory={setCategory} />
      <MemoInputForm category={category} />
    </>
  )
}

export default AddExpense

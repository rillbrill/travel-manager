import { useState } from 'react'

import { CategoryType, ExpenseType } from './schedule.model'

const MemoInputForm = ({ category }: { category: CategoryType }) => {
  const [memo, setMemo] = useState<string>('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemo(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const newMemo: ExpenseType = {
      category: category.name,
      color: category.color,
      memo,
    }

    // DB에 추가
    console.log(newMemo)
  }

  return (
    <div className="mb-8">
      <form
        onSubmit={handleSubmit}
        className="my-3 flex items-center space-x-2 font-sans text-xs"
      >
        <label>메모</label>
        <input
          onChange={handleInputChange}
          type="text"
          id="memo"
          value={memo}
          placeholder="메모를 입력하세요"
          className="rounded border p-2"
          required
        />
        <button type="submit" className="rounded bg-blue-300 p-2 text-white">
          추가
        </button>
      </form>

      <form
        onSubmit={handleSubmit}
        className="my-3 flex items-center space-x-2 font-sans text-xs"
      >
        <label>경비</label>
        <input
          onChange={handleInputChange}
          type="text"
          id="memo"
          value={memo}
          placeholder="경비를 입력하세요"
          className="rounded border p-2"
          required
        />
      </form>
    </div>
  )
}

export default MemoInputForm

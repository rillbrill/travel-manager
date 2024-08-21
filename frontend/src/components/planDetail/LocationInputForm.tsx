import { useState } from 'react'

import { CategoryType, ScheduleType } from './schedule.model'

const LocationInputForm = ({ category }: { category: CategoryType }) => {
  const [location, setLocation] = useState<string>('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const newSchedule: ScheduleType = {
      category: category.name,
      color: category.color,
      location,
    }

    // DB에 추가
    console.log(newSchedule)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-2 font-sans text-xs"
    >
      <label className="w-12 font-semibold">장소</label>
      <input
        onChange={handleInputChange}
        type="text"
        id="location"
        value={location}
        placeholder="장소를 입력하세요"
        className="rounded border p-2"
        required
      />
      <button type="submit" className="rounded bg-blue-300 p-2 text-white">
        추가
      </button>
    </form>
  )
}

export default LocationInputForm

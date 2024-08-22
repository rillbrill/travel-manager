import { useState } from 'react'

import { Day, DaysTabEnum } from '@/types/plan'

import { ActivityForm, ActivityList } from './activity'
import DayHeader from './DayHeader'
import DayTabs from './DayTabs'
import ExpenseTable from './expense/ExpenseTable'

type Props = {
  day: Day
  dayIndex: number
}

function DaySection({ day, dayIndex }: Props) {
  const { id, date, country, city, totalExpense, activities } = day
  const [currentTab, setCurrentTab] = useState<DaysTabEnum>(
    DaysTabEnum.Activity
  )
  const [showForm, setShowForm] = useState<boolean>(false)

  const changeCurrentTab = (tab: DaysTabEnum) => {
    setCurrentTab(tab)
    setShowForm(false)
  }
  const addForm = () => {
    setShowForm(true)
  }

  return (
    <div className="relative flex flex-col">
      {/* header */}
      <DayHeader
        dayIndex={dayIndex}
        date={date}
        country={country}
        city={city}
        totalExpense={totalExpense}
      />

      <div className="ml-14 mt-3 flex flex-col gap-2">
        {/* tabs */}
        <DayTabs
          currentTab={currentTab}
          changeCurrentTab={changeCurrentTab}
          addForm={addForm}
        />

        {/* content */}
        {currentTab === DaysTabEnum.Activity && (
          <ActivityList activities={activities} />
        )}
        {currentTab === DaysTabEnum.Expense && <ExpenseTable />}
        {showForm && <ActivityForm />}
      </div>
    </div>
  )
}

export default DaySection

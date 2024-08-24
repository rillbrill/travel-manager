import { useState } from 'react'

import { Day, DaysTabEnum } from '@/types/plan'

import { ActivityForm, ActivityList } from './activity'
import DayHeader from './DayHeader'
import DayTabs from './DayTabs'
import ExpenseTable from './expense/ExpenseTable'

type Props = {
  day: Day
  dayIndex: number
  country: string
}

function DaySection({ day, dayIndex, country }: Props) {
  const { id, date, activities } = day
  const [currentTab, setCurrentTab] = useState<DaysTabEnum>(
    DaysTabEnum.Activity
  )
  const [showForm, setShowForm] = useState<boolean>(false)

  const changeCurrentTab = (tab: DaysTabEnum) => {
    setCurrentTab(tab)
    setShowForm(false)
  }
  const openForm = () => {
    setShowForm(true)
  }
  const closeForm = () => {
    setShowForm(false)
  }

  return (
    <div className="relative flex flex-col">
      {/* header */}
      <DayHeader
        dayIndex={dayIndex}
        date={date}
        country={country}
        totalExpense={0}
      />

      <div className="ml-14 mt-3 flex flex-col gap-2">
        {/* tabs */}
        <DayTabs
          currentTab={currentTab}
          changeCurrentTab={changeCurrentTab}
          openForm={openForm}
        />

        {/* content */}
        {showForm && (
          <ActivityForm
            currentTab={currentTab}
            handleCancel={closeForm}
            handleSave={() => {}}
          />
        )}
        {currentTab === DaysTabEnum.Activity && (
          <ActivityList activities={activities} dayId={id} />
        )}
        {currentTab === DaysTabEnum.Expense && <ExpenseTable />}
      </div>
    </div>
  )
}

export default DaySection

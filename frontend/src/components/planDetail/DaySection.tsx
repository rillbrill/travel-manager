import { useState } from 'react'

import { Day, DaysTabEnum } from '@/types/plan'

import { ActivityForm, ActivityList } from './activity'
import DayHeader from './DayHeader'
import DayTabs from './DayTabs'
import { calculateExpenses } from './expense/CaculateExpenses'
import ExpenseForm from './expense/ExpenseForm'
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

  // Calculate expenses for the current day
  const expenses = calculateExpenses(day)

  return (
    <div className="relative flex flex-col">
      {/* header */}
      <DayHeader
        dayIndex={dayIndex}
        date={date}
        country={country}
        //totalExpense={0}
        totalExpense={
          expenses.find((exp) => exp.category === '총 경비')?.totalCost || 0
        }
      />

      <div className="ml-14 mt-3 flex flex-col gap-2">
        {/* tabs */}
        <DayTabs
          currentTab={currentTab}
          changeCurrentTab={changeCurrentTab}
          openForm={openForm}
        />

        {/* content */}
        {showForm &&
          (currentTab === DaysTabEnum.Activity ? (
            <ActivityForm
              currentTab={currentTab}
              handleCancel={closeForm}
              handleSave={() => {}}
            />
          ) : currentTab === DaysTabEnum.Expense ? (
            <ExpenseForm
              handleAddExpense={(expenseName, krw) => {
                // 여기에 ExpenseForm에서 추가된 비용 처리 로직을 구현하세요.
                closeForm() // 폼 제출 후 닫기
              }}
              handleCancel={closeForm}
            />
          ) : null)}
        {/* {showForm && (
          <ActivityForm
            currentTab={currentTab}
            handleCancel={closeForm}
            handleSave={() => {}}
          />
        )} */}
        {currentTab === DaysTabEnum.Activity && (
          <ActivityList activities={activities} />
        )}
        {currentTab === DaysTabEnum.Expense && (
          <ExpenseTable expenses={expenses} />
        )}
      </div>
    </div>
  )
}

export default DaySection

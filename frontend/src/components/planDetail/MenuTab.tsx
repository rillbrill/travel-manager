import { useState } from 'react'
import { FaPlusSquare } from 'react-icons/fa'

import AddExpense from './AddExpense'
import AddSchedule from './AddSchedule'
import ExpenseList from './ExpenseList'
import ScheduleList from './ScheduleList'

const MenuTab = () => {
  const [activeTab, setActiveTab] = useState<string>('schedule')
  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  const [showAddForm, setShowAddForm] = useState<boolean>(false)

  const handleButtonClick = () => {
    setShowAddForm((prev) => !prev)
  }

  return (
    <>
      <div className="mx-5 my-3 flex justify-between space-x-4 font-sans text-xs">
        <div className="space-x-4">
          <button
            className={`mx-1 ${activeTab === 'schedule' ? 'text-primary-default' : ''}`}
            onClick={() => handleTabClick('schedule')}
          >
            일정
          </button>
          <button
            className={`${activeTab === 'expense' ? 'text-primary-default' : ''}`}
            onClick={() => handleTabClick('expense')}
          >
            경비
          </button>
        </div>
        <button onClick={handleButtonClick}>
          <FaPlusSquare size="20" color="#777777" />
        </button>
      </div>
      <div className="mx-5 my-3 flex justify-between space-x-4 font-sans text-xs">
        {activeTab === 'schedule' && <ScheduleList />}
        {activeTab === 'expense' && <ExpenseList />}
      </div>
      {activeTab === 'schedule' && showAddForm && <AddSchedule />}
      {activeTab === 'expense' && showAddForm && <AddExpense />}
    </>
  )
}

export default MenuTab

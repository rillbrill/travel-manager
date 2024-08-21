import { useState } from 'react'
import { FaPlusSquare } from 'react-icons/fa'

import AddExpenseForm from './AddExpenseForm'
import AddScheduleForm from './AddScheduleForm'
import ExpenseList from './ExpenseList'
import ScheduleList from './ScheduleList'

const TABS = [
  {
    name: 'schedule',
    label: '일정',
    List: ScheduleList,
    Form: AddScheduleForm,
  },
  {
    name: 'expense',
    label: '경비',
    List: ExpenseList,
    Form: AddExpenseForm,
  },
]

const MenuTab = ({ activeTab, onTabClick, onButtonClick }) => {
  return (
    <div className="mx-5 my-3 flex justify-between space-x-4 font-sans text-xs">
      <div className="space-x-4">
        {TABS.map((tab) => (
          <button
            key={tab.name}
            className={`mx-1 ${activeTab === tab.name ? 'text-primary-default' : ''}`}
            onClick={() => onTabClick(tab.name)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <button onClick={onButtonClick}>
        <FaPlusSquare size="20" color="#777777" />
      </button>
    </div>
  )
}

const List = ({ activeTab }) => {
  const activeTabConfig = TABS.find((tab) => tab.name === activeTab)
  if (!activeTabConfig) return null

  return (
    <div className="mx-5 my-3 flex justify-between space-x-4 font-sans text-xs">
      <activeTabConfig.List />
    </div>
  )
}

const Form = ({ activeTab, showAddForm }) => {
  const activeTabConfig = TABS.find((tab) => tab.name === activeTab)
  if (!activeTabConfig || !showAddForm) return null

  return <activeTabConfig.Form />
}

const PlanDetail = () => {
  const [activeTab, setActiveTab] = useState<string>('schedule')
  const [showAddForm, setShowAddForm] = useState<boolean>(false)

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    setShowAddForm(false)
  }

  const handleButtonClick = () => {
    setShowAddForm((prev) => !prev)
  }

  return (
    <>
      <MenuTab
        activeTab={activeTab}
        onTabClick={handleTabClick}
        onButtonClick={handleButtonClick}
      />
      <List activeTab={activeTab} />
      <Form activeTab={activeTab} showAddForm={showAddForm} />
    </>
  )
}

export default PlanDetail

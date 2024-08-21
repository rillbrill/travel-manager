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
    <div className="my-3 flex justify-between space-x-4 text-xs font-bold">
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

const Form = ({ activeTab, showAddForm }) => {
  const activeTabConfig = TABS.find((tab) => tab.name === activeTab)
  if (!activeTabConfig || !showAddForm) return null

  return <activeTabConfig.Form />
}

const DailyPlanDetail = ({ schedules, expenses }) => {
  const [activeTab, setActiveTab] = useState<string>('schedule')
  const [showAddForm, setShowAddForm] = useState<boolean>(false)

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    setShowAddForm(false)
  }

  const handleButtonClick = () => {
    setShowAddForm((prev) => !prev)
  }

  const Layout = ({ List, Form }) => {
    return (
      <>
        <div>{List}</div>
        {Form}
      </>
    )
  }

  return (
    <>
      <MenuTab
        activeTab={activeTab}
        onTabClick={handleTabClick}
        onButtonClick={handleButtonClick}
      />
      {/* <Layout
        List={() => {
          switch (activeTab) {
            case 'schedule':
              return <ScheduleList schedules={schedules} />
            case 'expense':
              return <ExpenseList expenses={expenses} />
          }
        }}
        Form={() => {
          switch (activeTab) {
            case 'schedule':
              return <ScheduleList schedules={schedules} />
            case 'expense':
              return <ExpenseList expenses={expenses} />
          }
        }}
      /> */}
      <div className="text-xs">
        {activeTab === 'schedule' && <ScheduleList schedules={schedules} />}
        {activeTab === 'expense' && <ExpenseList expenses={expenses} />}
        <Form activeTab={activeTab} showAddForm={showAddForm} />
      </div>
    </>
  )
}

export default DailyPlanDetail

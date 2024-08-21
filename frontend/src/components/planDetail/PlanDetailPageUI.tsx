import { useState } from 'react'
import { FaPlusSquare } from 'react-icons/fa'

import AddExpense from './AddExpense'
import AddSchedule from './AddSchedule'
import ExpenseList from './ExpenseList'
import { ShowAddFormState, Tab } from './schedule.model'
import ScheduleList from './ScheduleList'

const travelDays = [
  { day: '1', date: '2024.01.01', location: '일본 오키나와' },
  { day: '2', date: '2024.01.02', location: '일본 오키나와' },
  { day: '3', date: '2024.01.03', location: '일본 오사카' },
  { day: '4', date: '2024.01.04', location: '일본 오사카' },
  { day: '5', date: '2024.01.05', location: '일본 오사카' },
]

const dayColorLists = [
  'bg-yellow-400',
  'bg-red-400',
  'bg-blue-400',
  'bg-lime-400',
]

const PlanDetailPageUI = (/*{ travelDays}*/) => {
  const [activeTab, setActiveTab] = useState<Tab>('schedule')

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab)
  }

  const initialState: ShowAddFormState = travelDays.reduce((acc, dayInfo) => {
    acc[dayInfo.day] = { schedule: false, expense: false } // 날짜별로 각 탭의 폼 표시 여부를 false로 설정
    return acc
  }, {} as ShowAddFormState)

  const [showAddForm, setShowAddForm] = useState<ShowAddFormState>(initialState)

  const handleButtonClick = (day: string) => {
    setShowAddForm((prev) => {
      const newState: ShowAddFormState = {
        ...prev,
        [day]: {
          ...prev[day],
          [activeTab]: !prev[day][activeTab], // 현재 활성화된 탭에 대한 폼 표시 여부를 토글
        },
      }
      console.log('Button clicked for:', day)
      console.log('Updated showAddForm state:', newState) // 업데이트된 상태 확인
      return newState
    })
  }

  return (
    <>
      <h1 className="my-2.5 text-center font-sans text-xl font-bold">
        여행 이름
      </h1>
      {travelDays.map((dayInfo) => (
        <div key={dayInfo.day} className="mb-4">
          {/* 날짜와 장소 정보 */}
          <div className="flex items-center justify-between font-sans text-xs">
            <div
              className={`ml-5 mr-2 flex h-8 w-8 items-center justify-center rounded-lg ${dayColorLists[(parseInt(dayInfo.day) - 1) % 4]} text-white`}
            >
              {`Day${dayInfo.day}`}
            </div>
            <div className="mx-0">{dayInfo.date}</div>
            <div className="mx-5 ml-auto">{dayInfo.location}</div>
          </div>

          {/* 탭과 컨텐츠 */}
          <>
            <div className="mx-5 my-3 flex justify-between space-x-4 font-sans text-sm">
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
              <button onClick={() => handleButtonClick(dayInfo.day)}>
                <FaPlusSquare size="20" color="#2DD4BF" />
              </button>
            </div>
            <div className="mx-5 my-3 flex justify-between space-x-4 font-sans text-xs">
              {activeTab === 'schedule' && <ScheduleList />}
              {activeTab === 'expense' && <ExpenseList />}
            </div>
            <div className="mx-5 my-3 space-x-4 font-sans">
              {activeTab === 'schedule' &&
                showAddForm[dayInfo.day].schedule && <AddSchedule />}
              {activeTab === 'expense' && showAddForm[dayInfo.day].expense && (
                <AddExpense />
              )}
            </div>
          </>
        </div>
      ))}
    </>
  )
}

export default PlanDetailPageUI

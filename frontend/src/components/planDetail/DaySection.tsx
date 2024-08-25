import { useState } from 'react'

import { plansApi } from '@/api/plans'
import { useModal } from '@/hooks/useModal'
import { usePending } from '@/hooks/usePending'
import { HttpStatusCodeEnum } from '@/types'
import { Activity, AddActivityReqDto, Day, DaysTabEnum } from '@/types/plan'
import { calculateTotalExpense } from '@/utils/calculateTotalExpense'

import { ActivityForm, ActivityList } from './activity'
import DayHeader from './DayHeader'
import DayTabs from './DayTabs'
import ExpenseTable from './expense/ExpenseTable'

type Props = {
  planId: string
  day: Day
  dayIndex: number
  country: string
}

function DaySection({ planId, day, dayIndex, country }: Props) {
  const { id: dayId, date, activities } = day
  const [currentTab, setCurrentTab] = useState<DaysTabEnum>(
    DaysTabEnum.Activity
  )
  const {
    isModalOpen: showForm,
    openModal: openForm,
    closeModal: closeForm,
  } = useModal()
  const [activitiesByDay, setActivitiesByDay] = useState<Activity[]>(activities)
  const { isPending, toggleIsPending } = usePending()

  const changeCurrentTab = (tab: DaysTabEnum) => {
    setCurrentTab(tab)
    closeForm()
  }
  const addActivity = async (payload: AddActivityReqDto) => {
    toggleIsPending(true)

    if (currentTab === DaysTabEnum.Activity) {
      const response = await plansApi.addActivity(planId, dayId, payload)
      if (response?.status === HttpStatusCodeEnum.Created) {
        // update activity list
        const updatedRes = await plansApi.getActivitiesByDay(planId, dayId)
        if (updatedRes?.status === HttpStatusCodeEnum.OK) {
          setActivitiesByDay(updatedRes.data)
          toggleIsPending(false)
        }
      }
    } else {
      const response = await plansApi.addActivity(planId, dayId, payload)
      if (response?.status === HttpStatusCodeEnum.Created) {
        // update etc activity list
        const updatedRes = await plansApi.getEtcActivitiesByDay(planId, dayId)
        if (updatedRes?.status === HttpStatusCodeEnum.OK) {
          setActivitiesByDay(updatedRes.data)
          toggleIsPending(false)
        }
      }
    }

    closeForm()
  }

  return (
    <div className="flex flex-col">
      {/* header */}
      <DayHeader
        dayIndex={dayIndex}
        date={date}
        country={country}
        totalExpense={calculateTotalExpense(
          activitiesByDay.map((elem) => elem.activityExpenses || 0)
        )}
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
            isLoading={isPending}
            handleCancel={closeForm}
            handleSave={addActivity}
          />
        )}
        {currentTab === DaysTabEnum.Activity && (
          <ActivityList
            activities={activitiesByDay}
            setActivitiesByDay={setActivitiesByDay}
            planId={planId}
            dayId={dayId}
          />
        )}
        {currentTab === DaysTabEnum.Expense && (
          <ExpenseTable etcActivities={activitiesByDay} />
        )}
      </div>
    </div>
  )
}

export default DaySection

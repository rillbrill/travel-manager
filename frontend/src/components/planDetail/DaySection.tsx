import { DragDropContext, DropResult } from '@hello-pangea/dnd'
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

  const changeCurrentTab = async (tab: DaysTabEnum) => {
    const response =
      tab === DaysTabEnum.Activity
        ? await plansApi.getActivitiesByDay(planId, dayId)
        : await plansApi.getExpensesByDay(planId, dayId)

    if (response?.status === HttpStatusCodeEnum.OK) {
      setActivitiesByDay(response.data)
      toggleIsPending(false)
    }
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
      const response = await plansApi.addExpense(planId, dayId, payload)
      if (response?.status === HttpStatusCodeEnum.Created) {
        // update etc activity list
        const updatedRes = await plansApi.getExpensesByDay(planId, dayId)
        if (updatedRes?.status === HttpStatusCodeEnum.OK) {
          setActivitiesByDay(updatedRes.data)
          toggleIsPending(false)
        }
      }
    }

    closeForm()
  }
  const handleDragEnd = async ({
    destination,
    source,
    draggableId,
  }: DropResult) => {
    toggleIsPending(true)
    const response = await plansApi.changeActivityOrder({
      planId,
      dayId,
      activityId: draggableId,
      order: destination!.index + 1 || source.index + 1,
    })

    if (response?.status === HttpStatusCodeEnum.OK) {
      const updatedRes =
        currentTab === DaysTabEnum.Activity
          ? await plansApi.getActivitiesByDay(planId, dayId)
          : await plansApi.getExpensesByDay(planId, dayId)
      if (updatedRes?.status === HttpStatusCodeEnum.OK) {
        setActivitiesByDay(updatedRes.data)
        toggleIsPending(false)
      }
    }
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log('call', currentTab)
  //     toggleIsPending(true)

  //   }

  //   fetchData()
  // }, [currentTab])

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
        <DragDropContext onDragEnd={handleDragEnd}>
          {currentTab === DaysTabEnum.Activity && (
            <ActivityList
              activities={activitiesByDay}
              setActivitiesByDay={setActivitiesByDay}
              planId={planId}
              dayId={dayId}
            />
          )}
          {currentTab === DaysTabEnum.Expense && (
            <ExpenseTable
              planId={planId}
              dayId={dayId}
              activitiesByDay={activitiesByDay}
              setActivitiesByDay={setActivitiesByDay}
            />
          )}
        </DragDropContext>
      </div>
    </div>
  )
}

export default DaySection

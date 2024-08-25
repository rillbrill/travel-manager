import axios from 'axios'

import { Activity, Day, DaysResDto } from '@/types/plan'

const BASE_URL: string =
  import.meta.env.VITE_BE_BASE_URL || 'http://localhost:3333'

export const fetchDays = async (planId: string): Promise<Day[]> => {
  // const planId = '9e74d62c-3954-41ab-9aca-780c16a61f0d'
  try {
    const response = await axios.get<DaysResDto>(
      `${BASE_URL}/plans/${planId}/all`
    )

    const convertData: Day[] = response.data.map((day: Day) => {
      const temp: Activity[] = day.activities.map((activity) => ({
        id: activity.id,
        isActivity: activity.isActivity,
        order: activity.order,
        category: activity.category,
        activityName: activity.activity_name, // CamelCase로 변환된 이름
        activityLocation: activity.activity_location, // CamelCase로 변환된 이름
        detail: activity.detail,
        activityExpenses: activity.activity_expenses,
      }))

      return { ...day, activities: temp }
    })

    return convertData
  } catch (error) {
    console.error('Error fetching plans:', error)
    return []
  }
}

export const deleteActivity = async (
  planId: string,
  dayId: string,
  activityId: string
): Promise<void> => {
  try {
    await axios.delete(
      `${BASE_URL}/plans/${planId}/days/${dayId}/activities/${activityId}`
    )
    console.log(`Activity with id ${activityId} deleted successfully.`)
  } catch (error) {
    console.error('Error deleting activity:', error)
  }
}

import axios from 'axios'

import { Activity, Day, DaysResDto } from '@/types/plan'

export const fetchDays = async (): Promise<Day[]> => {
  const planId = '9e74d62c-3954-41ab-9aca-780c16a61f0d'
  try {
    const response = await axios.get<DaysResDto>(
      `http://localhost:3333/plans/${planId}/all`
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

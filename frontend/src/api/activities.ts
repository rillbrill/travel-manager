import { EditActivityReqDto, EditActivityResDto } from '@/types/plan'

import { axiosRequestHandler } from './http'

export const deleteActivity = async (
  planId: string,
  dayId: string,
  activityId: string
) => {
  try {
    const { status } = await axiosRequestHandler({
      method: 'delete',
      url: `/api/plans/${planId}/days/${dayId}/activities/${activityId}`,
    })
    console.log(`Activity with id ${activityId} deleted successfully.`)
    return { status }
  } catch (error) {
    console.error('Error deleting activity:', error)
  }
}

export const updateActivity = async (
  planId: string,
  dayId: string,
  activityId: string,
  payload: EditActivityReqDto
) => {
  try {
    const { data, status } = await axiosRequestHandler<
      EditActivityResDto,
      EditActivityReqDto
    >({
      method: 'put',
      url: `/api/plans/${planId}/days/${dayId}/activities/${activityId}`,
      data: payload,
    })
    return { data, status }
  } catch (error) {
    console.error('Error updating activity:', error)
  }
}

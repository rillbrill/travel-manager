import {
  ActivitiesByDayResDto,
  ActivitiesByPlanResDto,
  AddActivityReqDto,
  AddActivityResDto,
  AddEtcActivityReqDto,
  AddEtcActivityResDto,
  AddPlanReqDto,
  AddPlanResDto,
  PlacesResDto,
  PlanResDto,
} from '@/types/plan'

import { axiosRequestHandler } from './http'

export const plansApi = {
  addPlan: async (payload: AddPlanReqDto) => {
    try {
      const { data, status } = await axiosRequestHandler<
        AddPlanResDto,
        AddPlanReqDto
      >({
        method: 'post',
        url: '/api/plans',
        data: payload,
      })

      return { data, status }
    } catch (error) {
      console.error('Plans api request failed', error)
    }
  },
  getPlaces: async () => {
    try {
      const { data, status } = await axiosRequestHandler<PlacesResDto>({
        method: 'get',
        url: '/api/city',
      })

      return { data, status }
    } catch (error) {
      console.error('Get cities api request failed', error)
    }
  },
  getPlanById: async (planId: string) => {
    try {
      const { data, status } = await axiosRequestHandler<PlanResDto>({
        method: 'get',
        url: `/api/plans/${planId}`,
      })

      return { data, status }
    } catch (error) {
      console.error('Get plan by id request failed', error)
    }
  },
  getActivitiesByPlan: async (planId: string) => {
    try {
      const { data, status } =
        await axiosRequestHandler<ActivitiesByPlanResDto>({
          method: 'get',
          url: `/api/plans/${planId}/all`,
        })

      return { data, status }
    } catch (error) {
      console.error('Get plan by id request failed', error)
    }
  },
  getActivitiesByDay: async (planId: string, dayId: string) => {
    try {
      const { data, status } = await axiosRequestHandler<ActivitiesByDayResDto>(
        {
          method: 'get',
          url: `/api/plans/${planId}/days/${dayId}/activities`,
        }
      )

      return { data, status }
    } catch (error) {
      console.error('Get plan by id request failed', error)
    }
  },
  getEtcActivitiesByDay: async (planId: string, dayId: string) => {
    try {
      const { data, status } = await axiosRequestHandler<ActivitiesByDayResDto>(
        {
          method: 'get',
          url: `/api/plans/${planId}/days/${dayId}/activities?isActivity=false`,
        }
      )

      return { data, status }
    } catch (error) {
      console.error('Get plan by id request failed', error)
    }
  },
  addActivity: async (
    planId: string,
    dayId: string,
    payload: AddActivityReqDto
  ) => {
    try {
      const { data, status } = await axiosRequestHandler<
        AddActivityResDto,
        AddActivityReqDto
      >({
        method: 'post',
        url: `/api/plans/${planId}/days/${dayId}/activities`,
        data: payload,
      })

      return { data, status }
    } catch (error) {
      console.error('Add activity request failed', error)
    }
  },
  addEtcActivity: async (
    planId: string,
    dayId: string,
    payload: AddEtcActivityReqDto
  ) => {
    try {
      const { data, status } = await axiosRequestHandler<
        AddEtcActivityResDto,
        AddEtcActivityReqDto
      >({
        method: 'post',
        url: `/api/plans/${planId}/days/${dayId}/activities/expenses`,
        data: payload,
      })

      return { data, status }
    } catch (error) {
      console.error('Add expense activity request failed', error)
    }
  },
}

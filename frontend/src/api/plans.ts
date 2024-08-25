import axios from 'axios'

import { Plan } from '@/models/plan.model'
import {
  ActivitiesByDayResDto,
  ActivitiesByPlanResDto,
  AddActivityReqDto,
  AddActivityResDto,
  AddEtcActivityReqDto,
  AddEtcActivityResDto,
  AddPlanReqDto,
  AddPlanResDto,
  ChangeActivityOrderReqDto,
  ChangeActivityOrderResDto,
  ConvertCurrencyReqDto,
  ConvertCurrencyResDto,
  CountryCodeResDto,
  PlacesResDto,
  PlanResDto,
} from '@/types/plan'

import { axiosRequestHandler } from './http'

const BASE_URL: string =
  import.meta.env.VITE_BE_BASE_URL || 'http://localhost:3333'

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
          url: `/api/plans/${planId}/days/${dayId}/activities/isActivity`,
        }
      )

      return { data, status }
    } catch (error) {
      console.error('Get plan by id request failed', error)
    }
  },
  getExpensesByDay: async (planId: string, dayId: string) => {
    try {
      const { data, status } = await axiosRequestHandler<ActivitiesByDayResDto>(
        {
          method: 'get',
          url: `/api/plans/${planId}/days/${dayId}/activities/expenses`,
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
  changeActivityOrder: async ({
    planId,
    dayId,
    activityId,
    order,
  }: ChangeActivityOrderReqDto) => {
    try {
      const { data, status } = await axiosRequestHandler<
        ChangeActivityOrderResDto,
        Pick<ChangeActivityOrderReqDto, 'order'>
      >({
        method: 'put',
        url: `/api/plans/${planId}/days/${dayId}/activities/${activityId}/order`,
        data: { order },
      })

      return { data, status }
    } catch (error) {
      console.error('Change activity order request failed', error)
    }
  },
  addExpense: async (
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
  getCountryCode: async (planId: string) => {
    try {
      const { data, status } = await axiosRequestHandler<CountryCodeResDto>({
        method: 'get',
        url: `/api/plans/${planId}/currency`,
      })

      return { data, status }
    } catch (error) {
      console.error('Get country code request failed', error)
    }
  },
  convertCurrency: async ({ from, to, amount }: ConvertCurrencyReqDto) => {
    try {
      const { data, status } = await axiosRequestHandler<ConvertCurrencyResDto>(
        {
          method: 'get',
          url: `/api/currency?from=${from}&to=${to}&amount=${amount}`,
        }
      )

      return { data, status }
    } catch (error) {
      console.error('Convert currency requeset failed', error)
    }
  },
  fetchPlans: async (): Promise<Plan[]> => {
    try {
      const response = await axios.get<Plan[]>(`${BASE_URL}/api/plans`)
      return response.data
    } catch (error) {
      console.error('Error fetching plans:', error)
      return []
    }
  },
}

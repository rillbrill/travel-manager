import { AddPlanReqDto, AddPlanResDto, PlacesResDto } from '@/types/plan'

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
}

import axios from 'axios'

import { Plan } from '@/models/plan.model'

export const fetchPlans = async (): Promise<Plan[]> => {
  try {
    const response = await axios.get<Plan[]>('http://localhost:3333/plans')
    return response.data
  } catch (error) {
    console.error('Error fetching plans:', error)
    return []
  }
}

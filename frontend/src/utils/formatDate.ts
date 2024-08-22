import { format } from 'date-fns'

import { DateFormatTypeEnum } from '@/types'

export function formatDate(
  type: DateFormatTypeEnum,
  date?: string | Date | null
) {
  if (!date) return '-'

  return format(new Date(date), type as string)
}

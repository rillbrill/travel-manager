import { DayCategory, DayCategoryEnum } from '@/types/plan'

export const randomBgColorClassNames = [
  'bg-red-400',
  'bg-amber-500',
  'bg-lime-500',
  'bg-sky-400',
  'bg-indigo-500',
]

export const dayCategories: DayCategory[] = [
  {
    name: DayCategoryEnum.Activity,
    color: 'bg-[#A9C6F1]',
  },
  {
    name: DayCategoryEnum.Accommodation,
    color: 'bg-[#90BA8A]',
  },
  {
    name: DayCategoryEnum.Breakfast,
    color: 'bg-[#A3D4CC]',
  },
  {
    name: DayCategoryEnum.Lunch,
    color: 'bg-[#FEE2E2]',
  },
  {
    name: DayCategoryEnum.Dinner,
    color: 'bg-[#FEF08A]',
  },
  {
    name: DayCategoryEnum.Cafe,
    color: 'bg-[#F9C7F7]',
  },
  {
    name: DayCategoryEnum.Etc,
    color: 'bg-[#D9D9D9]',
  },
]

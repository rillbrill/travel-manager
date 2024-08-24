import {
  DayCategory,
  DayCategoryEnum,
  DaysResDto,
  PlanResDto,
} from '@/types/plan'

export const dummyPlan: PlanResDto = {
  id: '123456',
  planName: 'Summer Vacation 2024',
  planCountry: 'France',
  headCount: 4,
  startDate: new Date('2024-07-01'),
  endDate: new Date('2024-07-15'),
  totalExpenses: 5000,
  planEnd: false,
}

export const dummyDays: DaysResDto = [
  {
    id: 'plan_001',
    date: new Date('2024-07-02'),
    activities: [
      {
        id: 'activity_001',
        activityName: 'Eiffel Tower Visit',
        detail: 'Visiting the Eiffel Tower in Paris',
        activityLocation: 'Paris, France',
        activityExpenses: 100,
        category: '활동',
        isActivity: true,
        order: 1,
      },
      {
        id: 'activity_002',
        activityName: 'Seine River Cruise',
        detail: 'Evening cruise along the Seine River',
        activityLocation: 'Paris, France',
        activityExpenses: 50,
        category: '활동',
        isActivity: true,
        order: 2,
      },
    ],
  },
  {
    id: 'plan_002',
    date: new Date('2024-07-03'),
    activities: [
      {
        id: 'activity_003',
        activityName: 'Louvre Museum Tour',
        detail: 'Guided tour of the Louvre Museum',
        activityLocation: 'Paris, France',
        activityExpenses: 120,
        category: '활동',
        isActivity: true,
        order: 1,
      },
      {
        id: 'activity_004',
        activityName: 'Notre Dame Visit',
        detail: 'Exploring Notre Dame Cathedral',
        activityLocation: 'Paris, France',
        activityExpenses: 80,
        category: '활동',
        isActivity: true,
        order: 2,
      },
    ],
  },
]

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

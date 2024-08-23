import { DayCategory, DayCategoryEnum, DaysResDto } from '@/types/plan'

export const dummyDays: DaysResDto = [
  {
    id: 'day-1',
    planId: 'plan-1',
    date: new Date('2024-08-01'),
    country: 'Japan',
    city: 'Tokyo',
    totalExpense: 200,
    activities: [
      {
        id: 'activity-1',
        planId: 'plan-1',
        dayId: 'day-1',
        activityName: 'Visit Tokyo Tower',
        activityPlaceName: 'Tokyo Tower',
        activityDetail: 'Sightseeing at the iconic Tokyo Tower.',
        activityExpense: 50,
      },
      {
        id: 'activity-2',
        planId: 'plan-1',
        dayId: 'day-1',
        activityName: 'Lunch at Sushi Zanmai',
        activityPlaceName: 'Sushi Zanmai',
        activityDetail: 'Enjoying traditional sushi.',
        activityExpense: 30,
      },
      {
        id: 'activity-3',
        planId: 'plan-1',
        dayId: 'day-1',
        activityName: 'Visit Asakusa Temple',
        activityPlaceName: 'Asakusa',
        activityDetail: 'Exploring the historic temple.',
        activityExpense: 20,
      },
    ],
  },
  {
    id: 'day-2',
    planId: 'plan-1',
    date: new Date('2024-08-02'),
    country: 'Japan',
    city: 'Kyoto',
    totalExpense: 150,
    activities: [
      {
        id: 'activity-4',
        planId: 'plan-1',
        dayId: 'day-2',
        activityName: 'Visit Fushimi Inari Shrine',
        activityPlaceName: 'Fushimi Inari',
        activityDetail: 'Walking through the famous Torii gates.',
        activityExpense: 0,
      },
      {
        id: 'activity-5',
        planId: 'plan-1',
        dayId: 'day-2',
        activityName: 'Lunch at Nishiki Market',
        activityPlaceName: 'Nishiki Market',
        activityDetail: 'Tasting local street food.',
        activityExpense: 25,
      },
      {
        id: 'activity-6',
        planId: 'plan-1',
        dayId: 'day-2',
        activityName: 'Visit Kiyomizu Temple',
        activityPlaceName: 'Kiyomizu-dera',
        activityDetail: 'Exploring the famous temple with a view.',
        activityExpense: 20,
      },
    ],
  },
  {
    id: 'day-3',
    planId: 'plan-1',
    date: new Date('2024-08-03'),
    country: 'Japan',
    city: 'Osaka',
    totalExpense: 180,
    activities: [
      {
        id: 'activity-7',
        planId: 'plan-1',
        dayId: 'day-3',
        activityName: 'Visit Osaka Castle',
        activityPlaceName: 'Osaka Castle',
        activityDetail: 'Exploring the historic castle and park.',
        activityExpense: 25,
      },
      {
        id: 'activity-8',
        planId: 'plan-1',
        dayId: 'day-3',
        activityName: 'Lunch at Dotonbori',
        activityPlaceName: 'Dotonbori',
        activityDetail: 'Enjoying Takoyaki and Okonomiyaki.',
        activityExpense: 35,
      },
      {
        id: 'activity-9',
        planId: 'plan-1',
        dayId: 'day-3',
        activityName: 'Visit Universal Studios Japan',
        activityPlaceName: 'Universal Studios Japan',
        activityDetail: 'Experiencing theme park attractions.',
        activityExpense: 100,
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

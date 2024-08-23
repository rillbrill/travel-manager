import DailyPlanDetail from './DailyPlanDetail'
import DailyHeader from './DailySchedule'

const PlanDetailPageUI = () => {
  // 단일 계획 조회
  // {
  //  * "id" : string, //계획 id
  //  *  "plan_name" : string, // 계획 명
  //   "plan_country" : string, // 계획 타겟 나라
  //  *  "start_date" : date, //시작일
  //  *  "end_date" : date, // 종료일
  //   "head_count" : number, // 인원
  //   "total_expenses" : int. // 계획 총 경비
  // }

  // N일차 전체 일정 조회 /api/plans/:planId?days=all

  // [
  //   {
  //    * "id" : string, // 일정 id
  //    * "plan_id" : string, // 상위 부모인 '계획` id
  //     "date" : date, // 일정의 날짜
  //     "day_city": string, // 일정의 타겟 도시
  //     "day_loc" : string, // 일정의 타겟 지역
  //   } ... []
  // ]

  // 일정 내 전체 활동 조회 + 카테고리 추가 ..
  // [
  //   {
  //     "id" : string, // 활동 id
  //   *  "day_id" : string // 상위 부모인 '일정' 의 id
  //   *  "activity_name" : string, // 활동 이름
  //     "activity_longitude" : number, // 활동 상세 주소(경도)
  //     "activity_latitude" : number, // 활동 상세 주소(위도)
  //     "detail" : string, // 활동 상세 내용
  //     "activity_expense" : number // 활동 경비
  //   }...
  // ]

  const days = [
    {
      planId: 'plan_id',
      dayId: 'day_id',
      day: 1,
      date: '2024-01-01',
      location: '일본 오키나와',
      schedules: [
        { category: '활동', color: '#A9C6F1', location: '모모치 해변' },
        { category: '아침', color: '#A3D4CC', location: 'OO 식당' },
      ],
    },
    {
      planId: 'plan_id',
      dayId: 'day_id',
      day: 2,
      date: '2024-01-02',
      location: '일본 오키나와',
      schedules: [
        { category: '활동', color: '#A9C6F1', location: 'AA 뮤지컬' },
        { category: '저녁', color: '#FEF08A', location: 'BB 식당' },
      ],
    },
  ]

  const expenses = []

  return (
    <>
      <h1 className="text-center font-sans text-xl">여행 이름</h1>
      {days.map((day) => (
        <div className="mx-3 font-sans" key={day.day}>
          <DailyHeader day={day.day} date={day.date} location={day.location} />
          <div className="mx-4 mb-5">
            <DailyPlanDetail schedules={day.schedules} expenses={expenses} />
          </div>
        </div>
      ))}
    </>
  )
}

export default PlanDetailPageUI

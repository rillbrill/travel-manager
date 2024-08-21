const dayColorLists = [
  'bg-yellow-400',
  'bg-red-400',
  'bg-blue-400',
  'bg-lime-400',
]

const DailyHeader = ({ day, date, location }) => {
  return (
    <>
      <div className="flex items-center justify-between text-xs">
        <div
          className={`mx-1 flex h-8 w-8 items-center justify-center rounded-lg ${dayColorLists[(parseInt(day) - 1) % 4]} text-white`}
        >
          Day{day} {/* 1일차, 2일차 ... */}
        </div>
        <div className="mx-1">
          {date} {/* 여행 날짜 */}
        </div>
        <div className="mx-1 ml-auto">
          {location} {/* 여행 장소 */}
        </div>
      </div>
    </>
  )
}

export default DailyHeader

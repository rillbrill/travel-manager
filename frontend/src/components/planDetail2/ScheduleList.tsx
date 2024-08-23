const ScheduleList = ({ schedules }) => {
  // const [schedules, setSchedules] = useState<ScheduleType[]>([
  //   { category: '활동', color: '#A9C6F1', location: '모모치 해변' },
  // ])

  return (
    <div className="space-y-3">
      {schedules.map((item, index) => (
        <div key={index} className="space-x-4 space-y-1">
          <div className="flex items-center space-x-2">
            <div
              className="mx-1 rounded-lg px-2 py-1 font-sans text-xs"
              style={{ backgroundColor: item.color }}
            >
              {item.category}
            </div>
            <p>{item.location}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ScheduleList

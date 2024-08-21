import { ExpenseType } from './schedule.model'

const ExpenseList = ({ expenses }) => {
  return (
    <div className="space-y-3">
      {expenses.map((item, index) => (
        <div key={index} className="space-x-4 space-y-1">
          <div className="flex items-center space-x-2">
            <div
              className="mx-1 rounded-lg px-2 py-1 font-sans text-xs"
              style={{ backgroundColor: item.color }}
            >
              {item.category}
            </div>
            <p>{item.expense}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExpenseList

export function calculateTotalExpense(expenses: number[]) {
  return expenses.reduce((prev, cur) => prev + cur, 0)
}

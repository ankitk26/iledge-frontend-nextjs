import { getCurrAndPrevMonthExpenses } from "@/queries/curr-and-prev-month-expenses";
import { ExpenseBudgetChart } from "./expense-budget-chart";

export default async function CurrentMonthExpenses() {
  const monthlyTransactions = await getCurrAndPrevMonthExpenses();

  const currentMonthExpenses = monthlyTransactions[1]?.total_amount ?? 0;
  const previousMonthExpenses = monthlyTransactions[0]?.total_amount ?? 0;

  return (
    <div className="flex items-center">
      <ExpenseBudgetChart
        currentMonthExpenses={currentMonthExpenses}
        previousMonthExpenses={previousMonthExpenses}
      />
    </div>
  );
}

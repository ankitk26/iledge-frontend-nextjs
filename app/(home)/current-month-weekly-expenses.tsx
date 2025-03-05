import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WeeklyExpensesBarChart from "@/app/(home)/weekly-expenses-bar-chart";
import { currMonthWeeklyExpenses } from "@/queries/weekly-expenses";

export async function CurrentMonthWeeklyExpenses() {
  const weeklyExpenses = await currMonthWeeklyExpenses();

  const chartData = weeklyExpenses.map((week) => ({
    week: week.week_no,
    amount: week.total_amount,
    fill: "var(--color-brand-800)",
  }));

  return (
    <Card className="flex w-auto flex-col md:col-span-2">
      <CardHeader className="text-center">
        <CardTitle>Weekly expenses this month</CardTitle>
      </CardHeader>
      <CardContent className="m-0 flex-1 px-6">
        {chartData.length === 0 ? (
          <p className="text-center text-sm text-neutral-500">
            No transactions this month. Please refresh if needed
          </p>
        ) : (
          <WeeklyExpensesBarChart chartData={chartData} />
        )}
      </CardContent>
    </Card>
  );
}

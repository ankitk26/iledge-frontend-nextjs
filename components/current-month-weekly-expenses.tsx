import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WeeklyExpensesBarChart from "@/components/weekly-expenses-bar-chart";
import { currMonthWeeklyExpenses } from "@/queries/weekly-expenses";

export async function CurrentMonthWeeklyExpenses() {
  const weeklyExpenses = await currMonthWeeklyExpenses();

  const chartData = weeklyExpenses.map((week) => ({
    week: week.week_no,
    amount: week.total_amount,
    fill: "var(--color-brand-800)",
  }));

  return (
    <Card className="w-auto flex flex-col col-span-2">
      <CardHeader className="text-center">
        <CardTitle>Weekly expenses this month</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 px-6 m-0">
        <WeeklyExpensesBarChart chartData={chartData} />
      </CardContent>
    </Card>
  );
}

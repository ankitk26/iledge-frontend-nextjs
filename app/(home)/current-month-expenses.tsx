import BudgetSpendPieChart from "@/app/(home)/budget-spend-pie-chart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import { getExpensesComparison } from "@/queries/get-expenses-comparison";
import { ArrowDown, ArrowUp } from "lucide-react";

const BUDGET = 30000;

export default async function CurrentMonthExpenses() {
  const expensesComparison = await getExpensesComparison();

  const currMonthExpenses = expensesComparison[1]?.total_amount ?? 0;
  const previousMonthExpenses = expensesComparison[0]?.total_amount ?? 0;

  const margin = Math.abs(
    Math.round(
      ((currMonthExpenses - previousMonthExpenses) / previousMonthExpenses) *
        100,
    ),
  );

  const hasBudgetCrossed = currMonthExpenses > BUDGET;

  const budgetUsedPercentage = Math.round((currMonthExpenses / BUDGET) * 100);

  const chartConfig = {
    amount: {
      label: "Amount",
    },
    expense: {
      label: "Expense",
    },
    budget: {
      label: "Budget",
    },
  } satisfies ChartConfig;

  const chartData = [
    {
      type: "expense",
      amount: currMonthExpenses,
      fill: "var(--color-brand-800)",
    },
    {
      type: "savings",
      amount: Math.max(BUDGET - currMonthExpenses, 0),
      fill: "var(--color-brand-200)",
    },
  ];

  return (
    <Card className="flex flex-col gap-4 lg:col-span-1">
      <CardHeader className="text-center">
        <CardTitle>Current month expenses</CardTitle>
      </CardHeader>
      <CardContent className="py-0">
        <BudgetSpendPieChart
          chartData={chartData}
          chartConfig={chartConfig}
          currentMonthExpenses={currMonthExpenses}
        />
      </CardContent>
      <CardFooter className="flex flex-col gap-2 py-8">
        <div
          className={cn(
            "font-bold",
            hasBudgetCrossed ? "text-rose-500" : "text-emerald-500",
          )}
        >
          {hasBudgetCrossed
            ? "Budget exceeded!"
            : `${budgetUsedPercentage}% budget used`}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span>vs {formatCurrency(previousMonthExpenses)} last month</span>
          <div
            className={cn(
              "flex items-center rounded-full px-2 text-sm",
              margin > 0
                ? "bg-emerald-100 text-emerald-500"
                : "bg-rose-100 text-rose-500",
            )}
          >
            {margin < 0 ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}

            <span>{`${margin}%`}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

"use client";

import ErrorMessage from "@/components/error-message";
import { CardContent, CardFooter } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import { getExpensesComparisonByReceiver } from "@/queries/get-expenses-comparison-by-receiver";
import { useQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useParams } from "next/navigation";
import { Label, Pie, PieChart } from "recharts";

export default function CompareMonthlyTransactions() {
  const { receiver_id } = useParams() as {
    receiver_id: string;
  };

  const { data, isPending, isError } = useQuery({
    queryKey: ["compare_expenses", receiver_id],
    queryFn: () => getExpensesComparisonByReceiver(receiver_id),
  });

  if (isPending) {
    return <Skeleton className="mx-auto my-auto h-72 w-72" />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  if (data.length === 0) {
    return <p>No expenses this month</p>;
  }

  const currMonthExpenses = data[1].total_amount;
  const prevMonthExpenses = data[0].total_amount;

  const chartData = [
    {
      type: "currMonth",
      amount: currMonthExpenses,
      fill: "var(--color-brand-800)",
    },
    {
      type: "prevMonth",
      amount: prevMonthExpenses,
      fill: "var(--color-brand-200)",
    },
  ];

  // Calculate margin with a check for zero previous month expenses
  let margin = 0;
  let isIncrease = false;

  if (prevMonthExpenses === 0) {
    // If previous month was zero, and current month has expenses
    if (currMonthExpenses > 0) {
      margin = 100; // Show as 100% increase
      isIncrease = true;
    } else {
      margin = 0; // Both are zero, so 0% change
    }
  } else {
    margin = Math.abs(
      Math.round(
        ((currMonthExpenses - prevMonthExpenses) / prevMonthExpenses) * 100,
      ),
    );
    isIncrease = currMonthExpenses > prevMonthExpenses;
  }

  return (
    <>
      <CardContent className="my-auto items-center">
        <ChartContainer
          config={{
            amount: {
              label: "Amount",
            },
            currMonth: {
              label: "Current Month",
            },
            prevMonth: {
              label: "Previous Month",
            },
          }}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={80}
              outerRadius={120}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-white text-lg font-bold"
                        >
                          {formatCurrency(currMonthExpenses)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-brand-100 text-sm"
                        >
                          spent
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span>vs {formatCurrency(prevMonthExpenses)} last month</span>
          <div
            className={cn(
              "flex items-center rounded-full px-2 text-sm",
              isIncrease
                ? "bg-emerald-100 text-emerald-500"
                : "bg-rose-100 text-rose-500",
            )}
          >
            {isIncrease ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}

            <span>{`${margin}%`}</span>
          </div>
        </div>
      </CardFooter>
    </>
  );
}

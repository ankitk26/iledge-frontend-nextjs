"use client";

import { Label, Pie, PieChart } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/format-currency";

export function ExpenseBudgetChart({
  monthlyExpenses,
}: {
  monthlyExpenses: number;
}) {
  const budget = 30000;

  const chartData = [
    { type: "expense", amount: monthlyExpenses, fill: "var(--color-sky-800)" },
    {
      type: "savings",
      amount: Math.max(budget - monthlyExpenses, 0),
      fill: "var(--color-sky-100)",
    },
  ];

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

  return (
    <Card className="flex flex-col p-6">
      <CardHeader className="mx-auto py-0">
        <CardTitle>Current month expenses</CardTitle>
      </CardHeader>
      <CardContent className="p-0 mt-4 flex-1">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square">
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
                          {formatCurrency(monthlyExpenses)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-sky-100 text-sm"
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
        <CardFooter className="mt-4 pb-0 flex flex-col">
          <div className="text-sm">
            {monthlyExpenses >= budget
              ? "Budget exceeded"
              : `${Math.round((monthlyExpenses / budget) * 100)}% used`}
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

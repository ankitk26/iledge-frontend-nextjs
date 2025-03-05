"use client";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { formatCurrency } from "@/lib/format-currency";
import { Label, Pie, PieChart } from "recharts";

export default function BudgetSpendPieChart({
  chartData,
  chartConfig,
  currentMonthExpenses,
}: {
  chartData: {
    type: string;
    amount: number;
    fill: string;
  }[];
  chartConfig: ChartConfig;
  currentMonthExpenses: number;
}) {
  return (
    <ChartContainer
      config={chartConfig}
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
                      {formatCurrency(currentMonthExpenses)}
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
  );
}

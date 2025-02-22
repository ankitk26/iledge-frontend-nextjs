"use client";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { formatCurrency } from "@/lib/format-currency";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

export default function WeeklyExpensesBarChart({
  chartData,
}: {
  chartData: {
    week: string;
    amount: number;
    fill: string;
  }[];
}) {
  const chartConfig = {
    amount: { label: "Amount" },
    ...Object.fromEntries(
      chartData.map(({ week }) => [
        week, // Week key is already formatted correctly
        {
          label: week.replace("week", "Week "),
          color: "var(--color-brand-800)",
        },
      ])
    ),
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square w-full max-h-[320px]"
    >
      <BarChart accessibilityLayer data={chartData} layout="vertical">
        <YAxis
          dataKey="week"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value) =>
            chartConfig[value as keyof typeof chartConfig]?.label
          }
          className="whitespace-nowrap"
        />
        <XAxis dataKey="amount" type="number" hide />
        <Bar dataKey="amount" radius={5} barSize={40}>
          <LabelList
            dataKey="amount"
            position="insideLeft"
            offset={10}
            formatter={formatCurrency}
            className="fill-white"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

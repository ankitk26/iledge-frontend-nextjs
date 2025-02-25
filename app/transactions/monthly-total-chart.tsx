"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { useTransactions } from "./transaction-provider";

export default function MonthlyTotalChart({
  monthlyTotals,
}: {
  monthlyTotals: {
    year_value: string;
    month_value: string;
    month_year: number;
    total_amount: number;
  }[];
}) {
  const { setMonth, setYear } = useTransactions();

  const chartData = monthlyTotals.map((month) => ({
    fill: "var(--color-brand-500)",
    ...month,
  }));

  const chartConfig = {
    total_amount: {
      label: "Total",
    },
    month_year: {
      label: "Month",
      color: "var(--color-red-500)",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto mt-10 h-[250px] w-full"
    >
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} horizontal={false} />
        <XAxis
          dataKey="month_year"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar
          dataKey="total_amount"
          radius={5}
          onClick={(data) => {
            setMonth(data.payload.month_value);
            setYear(data.payload.year_value);
          }}
        >
          <LabelList
            position="top"
            offset={12}
            className="fill-neutral-500"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

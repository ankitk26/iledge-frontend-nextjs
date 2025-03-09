"use client";

import ErrorMessage from "@/components/error-message";
import { Button } from "@/components/ui/button";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/format-currency";
import { getMonthlyTotals } from "@/queries/monthly-totals";
import { updateMonth, updateYear } from "@/stores/transaction-store";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

export default function MonthlyTotalChart() {
  const { data: monthlyTotals, isPending } = useQuery({
    queryKey: ["monthly_totals"],
    queryFn: getMonthlyTotals,
  });
  const [windowStart, setWindowStart] = useState(0);

  if (isPending) {
    return <Skeleton className="mt-8 h-60 w-full" />;
  }

  if (!monthlyTotals) {
    return <ErrorMessage />;
  }

  // 12 months displayed
  const windowSize = 12;
  // Move 6 months at a time
  const navigationStep = 6;

  // Slice the data to show the current window from the end
  const start = Math.max(0, monthlyTotals.length - windowSize - windowStart);
  const end = Math.min(monthlyTotals.length, start + windowSize);
  const windowedData = monthlyTotals.slice(start, end);

  const chartConfig = {
    total_amount: {
      label: "Total",
    },
    month_year: {
      label: "Month",
    },
  } satisfies ChartConfig;

  const handlePrevious = () => {
    // Only allow going back if there are more months before the current window
    if (monthlyTotals.length > windowSize + windowStart) {
      setWindowStart((prev) =>
        Math.min(prev + navigationStep, monthlyTotals.length - windowSize),
      );
    }
  };

  const handleNext = () => {
    // Only allow going forward if not at the start of the data
    if (windowStart > 0) {
      setWindowStart((prev) => Math.max(prev - navigationStep, 0));
    }
  };

  const handleMostRecent = () => {
    // Jump to the most recent months
    setWindowStart(0);
  };

  const handleMostOld = () => {
    // Jump to the oldest months
    setWindowStart(Math.max(0, monthlyTotals.length - windowSize));
  };

  // Determine if navigation buttons should be disabled
  const isPreviousDisabled = monthlyTotals.length <= windowSize + windowStart;
  const isNextDisabled = windowStart === 0;
  const isMostRecentDisabled = windowStart === 0;
  const isMostOldDisabled = monthlyTotals.length <= windowSize;

  return (
    <div className="flex flex-col items-center">
      <ChartContainer
        config={chartConfig}
        className="mt-10 aspect-auto h-[250px] w-full"
      >
        <BarChart
          accessibilityLayer
          data={windowedData}
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
          <Bar
            dataKey="total_amount"
            radius={5}
            className="cursor-pointer fill-brand-500 hover:fill-brand-700"
            onClick={(data) => {
              updateMonth(data.payload.month_value);
              updateYear(data.payload.year_value);
            }}
          >
            <LabelList
              position="top"
              offset={12}
              className="fill-neutral-500"
              fontSize={12}
              formatter={formatCurrency}
            />
          </Bar>
        </BarChart>
      </ChartContainer>

      <div className="mt-4 flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handleMostOld}
          disabled={isMostOldDisabled}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          disabled={isPreviousDisabled}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={isNextDisabled}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleMostRecent}
          disabled={isMostRecentDisabled}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

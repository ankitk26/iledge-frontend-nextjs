"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { useTransactions } from "./transaction-provider";
import { formatCurrency } from "@/lib/format-currency";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState, useMemo } from "react";

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
  const [windowStart, setWindowStart] = useState(0);

  const windowSize = 12; // 12 months displayed
  const navigationStep = 6; // Move 6 months at a time

  const memoizedMonthlyTotals = useMemo(() => monthlyTotals, [monthlyTotals]);

  // Slice the data to show the current window from the end
  const windowedData = useMemo(() => {
    // Take the specified months from the end
    const start = Math.max(
      0,
      memoizedMonthlyTotals.length - windowSize - windowStart,
    );
    const end = Math.min(memoizedMonthlyTotals.length, start + windowSize);

    return memoizedMonthlyTotals.slice(start, end).map((month) => ({
      fill: "var(--color-brand-500)",
      ...month,
    }));
  }, [memoizedMonthlyTotals, windowStart]);

  const chartConfig = {
    total_amount: {
      label: "Total",
    },
    month_year: {
      label: "Month",
      color: "var(--color-red-500)",
    },
  } satisfies ChartConfig;

  const handlePrevious = () => {
    // Only allow going back if there are more months before the current window
    if (memoizedMonthlyTotals.length > windowSize + windowStart) {
      setWindowStart((prev) =>
        Math.min(
          prev + navigationStep,
          memoizedMonthlyTotals.length - windowSize,
        ),
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
    setWindowStart(Math.max(0, memoizedMonthlyTotals.length - windowSize));
  };

  // Determine if navigation buttons should be disabled
  const isPreviousDisabled =
    memoizedMonthlyTotals.length <= windowSize + windowStart;
  const isNextDisabled = windowStart === 0;
  const isMostRecentDisabled = windowStart === 0;
  const isMostOldDisabled = memoizedMonthlyTotals.length <= windowSize;

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
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar
            dataKey="total_amount"
            radius={5}
            onClick={(data) => {
              // Subtract one since typescript date months start from zero
              setMonth(data.payload.month_value - 1);
              setYear(data.payload.year_value);
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

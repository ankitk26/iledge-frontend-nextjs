"use client";

import ChartPagination from "@/components/chart-navigation";
import { useMediaQuery } from "react-responsive";
import ErrorMessage from "@/components/error-message";
import { ChartContainer } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/format-currency";
import { getMonthlyTotals } from "@/queries/monthly-totals";
import { usePaginationControls } from "@/stores/pagination-store";
import { updateMonth, updateYear } from "@/stores/transaction-store";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

export default function MonthlyTotalChart() {
  const { data: monthlyTotals, isPending } = useQuery({
    queryKey: ["monthly_totals"],
    queryFn: getMonthlyTotals,
  });

  const isDesktopSize = useMediaQuery({ minWidth: 1024 });

  const paginationInstanceId = "all-transactions";
  const paginationConfig = {
    windowSize: isDesktopSize ? 12 : 6,
    navigationStep: isDesktopSize ? 12 : 6,
  };
  const { getWindowedData, showPagination } = usePaginationControls(
    paginationInstanceId,
    paginationConfig,
  );

  if (isPending) {
    return <Skeleton className="mt-8 h-60 w-full" />;
  }

  if (!monthlyTotals) {
    return <ErrorMessage />;
  }

  const windowedData = getWindowedData(monthlyTotals);

  return (
    <div className="flex flex-col items-center">
      <ChartContainer
        config={{
          total_amount: {
            label: "Total",
          },
          month_year: {
            label: "Month",
          },
        }}
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
            className="cursor-pointer fill-brand-600 hover:fill-brand-800"
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
              formatter={isDesktopSize ? formatCurrency : undefined}
            />
          </Bar>
        </BarChart>
      </ChartContainer>

      {showPagination && (
        <ChartPagination
          paginationInstanceId={paginationInstanceId}
          config={paginationConfig}
        />
      )}
    </div>
  );
}

"use client";

import ChartPagination from "@/components/chart-navigation";
import ErrorMessage from "@/components/error-message";
import { ChartContainer } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/format-currency";
import { getDailyTransactionsByReceiver } from "@/queries/get-daily-transactions-by-receiver";
import { usePaginationControls } from "@/stores/pagination-store";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

export default function DailyReceiverTransactions() {
  // get receiver_id from URL parameter
  const { receiver_id } = useParams() as {
    receiver_id: string;
  };

  const paginationInstanceId = `receivers-daily-${receiver_id}`;
  const { getWindowedData, showPagination } =
    usePaginationControls(paginationInstanceId);

  const {
    data: dailyTotals,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["daily_totals", receiver_id],
    queryFn: () => getDailyTransactionsByReceiver(parseInt(receiver_id)),
  });

  if (isPending) {
    return <Skeleton className="mt-8 h-60 w-full" />;
  }

  if (!dailyTotals || isError) {
    return <ErrorMessage />;
  }

  const windowedData = getWindowedData(dailyTotals);

  return (
    <div className="flex flex-col items-center">
      <ChartContainer
        config={{
          total_amount: {
            label: "Total",
          },
          transaction_date: {
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
            top: 30,
            bottom: 10,
          }}
        >
          <CartesianGrid vertical={false} horizontal={false} />
          <XAxis
            dataKey="transaction_date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
          />
          <Bar
            dataKey="total_amount"
            radius={5}
            className="fill-brand-500 hover:fill-brand-700"
          >
            <LabelList
              dataKey="total_amount"
              position="top"
              offset={8}
              className="fill-neutral-500"
              fontSize={12}
              formatter={formatCurrency}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
      {showPagination && (
        <ChartPagination paginationInstanceId={paginationInstanceId} />
      )}
    </div>
  );
}

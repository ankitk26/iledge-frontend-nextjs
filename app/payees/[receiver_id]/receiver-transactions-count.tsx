"use client";

import ChartPagination from "@/components/chart-navigation";
import ErrorMessage from "@/components/error-message";
import { ChartContainer } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { getTransactionsCountByReceiver } from "@/queries/get-transactions-count-by-receiver";
import { usePaginationControls } from "@/stores/pagination-store";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

export default function ReceiverTransactionsCount() {
  const { receiver_id } = useParams() as {
    receiver_id: string;
  };

  const paginationInstanceId = `receivers-transactions-count-${receiver_id}`;
  const paginationConfig = {
    windowSize: 6,
    navigationStep: 6,
  };
  const { getWindowedData, showPagination } = usePaginationControls(
    paginationInstanceId,
    paginationConfig,
  );

  const {
    data: monthlyCounts,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["receiver_transactions_count", receiver_id],
    queryFn: () => getTransactionsCountByReceiver(parseInt(receiver_id)),
  });

  if (isPending) {
    return <Skeleton className="mt-8 h-60 w-full" />;
  }

  if (!monthlyCounts || isError) {
    return <ErrorMessage />;
  }

  console.log(monthlyCounts);

  const windowedData = getWindowedData(monthlyCounts);

  return (
    <div className="flex flex-col items-center">
      <ChartContainer
        config={{
          transaction_count: {
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
            top: 30,
            bottom: 10,
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
            dataKey="transaction_count"
            radius={5}
            className="fill-brand-500 hover:fill-brand-700"
          >
            <LabelList
              dataKey="transaction_count"
              position="top"
              offset={8}
              className="fill-neutral-500"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
      {showPagination && (
        <ChartPagination
          key={paginationInstanceId}
          paginationInstanceId={paginationInstanceId}
          config={paginationConfig}
        />
      )}
    </div>
  );
}

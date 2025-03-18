"use client";

import ErrorMessage from "@/components/error-message";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getReceiverById } from "@/queries/get-receiver-by-id";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import CompareMonthlyTransactions from "./compare-monthly-transactions";
import DailyReceiverTransactions from "./daily-receiver-transactions";
import MonthlyReceiverTransactions from "./monthly-receiver-transactions";

export default function PayeePage() {
  const { receiver_id } = useParams() as {
    receiver_id: string;
  };

  const {
    data: receiver,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["payees", receiver_id],
    queryFn: () => getReceiverById(parseInt(receiver_id)),
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (!receiver || isError) {
    return <ErrorMessage />;
  }

  if (receiver.length === 0) {
    return <p>Invalid request</p>;
  }

  const singleReceiver = receiver[0];

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold">{singleReceiver.name}</h1>
      <h2 className="text-neutral-500">{singleReceiver.receiver_upi_id}</h2>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Daily transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DailyReceiverTransactions />
        </CardContent>
      </Card>

      <div className="mt-8 grid grid-cols-3 gap-8">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Monthly transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyReceiverTransactions />
          </CardContent>
        </Card>

        <Card className="col-span-1 flex flex-col justify-center">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Comparison with previous month
            </CardTitle>
          </CardHeader>
          <CompareMonthlyTransactions />
        </Card>
      </div>

      {/* <ReceiverExpensesCount /> */}
    </div>
  );
}

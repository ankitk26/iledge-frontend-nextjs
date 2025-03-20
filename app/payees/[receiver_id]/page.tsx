"use client";

import ErrorMessage from "@/components/error-message";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getReceiverById } from "@/queries/get-receiver-by-id";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import CompareMonthlyTransactions from "./compare-monthly-transactions";
import DailyReceiverTransactions from "./daily-receiver-transactions";
import MonthlyReceiverTransactions from "./monthly-receiver-transactions";
import ReceiverTransactionsCount from "./receiver-transactions-count";
import ReceiverTransactionsList from "./receiver-transactions-list";
import PayeeOverallTotal from "./payee-overall-total";

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
    <div className="mb-8 flex flex-col gap-8">
      <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold lg:text-2xl">
            {singleReceiver.name}
          </h1>
          <h2 className="text-sm text-neutral-500 lg:text-base">
            {singleReceiver.receiver_upi_id}
          </h2>
        </div>
        <PayeeOverallTotal />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Daily transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DailyReceiverTransactions />
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Monthly transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyReceiverTransactions />
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-center lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Comparison with previous month
            </CardTitle>
          </CardHeader>
          <CompareMonthlyTransactions />
        </Card>
      </div>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Transactions per month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ReceiverTransactionsCount />
        </CardContent>
      </Card>

      <ReceiverTransactionsList />
    </div>
  );
}

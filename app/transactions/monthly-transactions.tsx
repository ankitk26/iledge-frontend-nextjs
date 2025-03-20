"use client";

import ErrorMessage from "@/components/error-message";
import { Skeleton } from "@/components/ui/skeleton";
import { getTransactions } from "@/queries/get-transactions";
import { useTransactionStore } from "@/stores/transaction-store";
import { useQuery } from "@tanstack/react-query";
import TransactionItem from "./transaction-item";

export default function MonthlyTransactions() {
  const year = useTransactionStore((store) => store.year);
  const month = useTransactionStore((store) => store.month);

  const {
    data: monthlyTransactionsList,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["monthly_transactions", year, month],
    queryFn: () => getTransactions({ month, year }),
  });

  if (isPending) {
    return (
      <div className="mt-16 flex flex-col items-stretch gap-4">
        <Skeleton className="h-5 w-1/3" />
        <div className="flex flex-col items-stretch gap-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return <ErrorMessage />;
  }

  const date = new Date(year, month - 1).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className="mt-16">
      <h1>{date} transactions</h1>
      <div className="my-8 flex flex-col items-stretch gap-4">
        {monthlyTransactionsList &&
          monthlyTransactionsList.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
      </div>
    </section>
  );
}

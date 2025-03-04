"use client";

import TransactionItem from "./transaction-item";
import { useTransactions } from "./transaction-provider";

interface Props {
  allTransactions: {
    id: number;
    receiver_id: number;
    receiver_name: string;
    receiver_upi: string;
    transaction_date: Date | null;
    amount: number;
    category: string;
  }[];
}

export default function MonthlyTransactions({ allTransactions }: Props) {
  const { year, month } = useTransactions();

  const date = new Date(year, month).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const filteredTransactions = allTransactions.filter(
    (transaction) =>
      transaction.transaction_date?.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      }) == date,
  );

  return (
    <section className="mt-16">
      <h1>{date} transactions</h1>
      <div className="my-4 flex flex-col items-stretch gap-4">
        {filteredTransactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </section>
  );
}

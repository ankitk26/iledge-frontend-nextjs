"use client";

import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import { Utensils } from "lucide-react";
import Link from "next/link";

interface Props {
  transaction: {
    id: number;
    receiver_id: number;
    receiver_name: string;
    receiver_upi: string;
    transaction_date: Date | null;
    amount: number;
    category: string;
  };
}

export default function TransactionItem({ transaction }: Props) {
  const isReceived = transaction.amount < 0;
  const amountColor = isReceived ? "text-emerald-500" : "text-rose-500";

  const formattedDate = new Date(
    transaction.transaction_date!
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex items-center rounded-xl px-4 justify-between border border-neutral-800 py-3">
      <div className="flex items-center gap-6">
        {/* Icon (Can be customized per category) */}
        <Utensils className="text-neutral-600" />

        {/* Transaction Details */}
        <div className="flex flex-col items-start gap-1">
          <p className="font-medium text-sm">{transaction.receiver_name}</p>
          <Link
            href={`/payees/${transaction.receiver_id}`}
            className="hover:underline hover:decoration-neutral-500"
          >
            <p className="text-neutral-500 text-sm">
              {transaction.receiver_upi}
            </p>
          </Link>
          <p className="text-xs text-neutral-500">{formattedDate}</p>
        </div>
      </div>

      {/* Amount */}
      <span className={cn("font-medium", amountColor)}>
        {formatCurrency(transaction.amount * -1)}
      </span>
    </div>
  );
}

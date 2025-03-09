"use client";

import { categoryIcons } from "@/lib/category-icon";
import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Transaction } from "./types/transaction";
import { formatDate } from "@/lib/format-iso-string";

interface Props {
  transaction: Transaction;
}

export default function TransactionItem({ transaction }: Props) {
  const isReceived = transaction.amount < 0;

  const formattedDate = formatDate(transaction.transaction_date!);

  const CategoryIcon =
    categoryIcons[transaction.category_icon as keyof typeof categoryIcons] ||
    categoryIcons.default;

  return (
    <div className="group">
      <Link href={`/payees/${transaction.receiver_id}`} className="block">
        <div className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 transition-colors duration-200 hover:bg-neutral-800/80">
          <div className="flex items-center space-x-4">
            {/* Categorized Icon */}
            <div className="rounded-lg bg-neutral-800 p-2 transition-colors duration-200 group-hover:bg-neutral-700">
              <CategoryIcon
                className="text-neutral-400 group-hover:text-neutral-300"
                size={24}
              />
            </div>

            {/* Transaction Details */}
            <div className="flex flex-col">
              <p className="text-sm font-medium text-neutral-200 transition-colors duration-200 group-hover:text-white">
                {transaction.receiver_name}
              </p>
              <div className="mt-1 flex items-center space-x-2">
                <p className="text-xs text-neutral-500 transition-colors duration-200 group-hover:text-neutral-400">
                  {transaction.receiver_upi}
                </p>
                <span className="text-xs text-neutral-700">•</span>
                <p className="text-xs text-neutral-500 transition-colors duration-200 group-hover:text-neutral-400">
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>

          {/* Amount */}
          <span
            className={cn(
              "text-sm font-medium",
              isReceived ? "text-emerald-400" : "text-rose-400",
            )}
          >
            {formatCurrency(Math.abs(transaction.amount))}
          </span>
        </div>
      </Link>
    </div>
  );
}

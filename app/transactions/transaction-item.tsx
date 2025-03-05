"use client";

import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import Link from "next/link";

// Define category icons mapping
const CATEGORY_ICONS = {
  food: LucideIcons.Utensils,
  groceries: LucideIcons.ShoppingCart,
  transport: LucideIcons.Car,
  entertainment: LucideIcons.Film,
  utilities: LucideIcons.Bolt,
  healthcare: LucideIcons.HeartPulse,
  shopping: LucideIcons.ShoppingBag,
  default: LucideIcons.CircleHelp,
};

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
  const amountColor = isReceived ? "text-emerald-400" : "text-rose-400";

  const formattedDate = new Date(
    transaction.transaction_date!,
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const CategoryIcon =
    CATEGORY_ICONS[
      transaction.category.toLowerCase() as keyof typeof CATEGORY_ICONS
    ] || CATEGORY_ICONS.default;

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
          <span className={cn("text-sm font-medium", amountColor)}>
            {formatCurrency(Math.abs(transaction.amount))}
          </span>
        </div>
      </Link>
    </div>
  );
}

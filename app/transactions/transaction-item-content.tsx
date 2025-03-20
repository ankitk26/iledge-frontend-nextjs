import { categoryIcons } from "@/lib/category-icon";
import { formatCurrency } from "@/lib/format-currency";
import { formatDate } from "@/lib/format-date";
import { cn } from "@/lib/utils";
import { Transaction } from "./types/transaction";

type Props = {
  transaction: Transaction;
};

export default function TransactionItemContent({ transaction }: Props) {
  const isReceived = transaction.amount < 0;

  const formattedDate = formatDate(transaction.transaction_date!);

  const CategoryIcon =
    categoryIcons[transaction.category_icon as keyof typeof categoryIcons] ||
    categoryIcons.default;

  return (
    <div className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 transition-colors duration-200 hover:bg-neutral-800/80 sm:px-4 sm:py-3">
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Categorized Icon */}
        <div className="rounded-lg bg-neutral-800 p-1.5 transition-colors duration-200 group-hover:bg-neutral-700 sm:p-2">
          <CategoryIcon
            className="text-neutral-400 group-hover:text-neutral-300 sm:h-6 sm:w-6"
            size={20}
            width={20}
            height={20}
          />
        </div>

        {/* Transaction Details */}
        <div className="flex flex-col">
          <p className="max-w-[150px] truncate text-xs font-medium text-neutral-200 transition-colors duration-200 group-hover:text-white sm:max-w-xs sm:text-sm">
            {transaction.receiver_name}
          </p>
          <div className="mt-0.5 flex flex-col sm:mt-1 sm:flex-row sm:items-center sm:space-x-2">
            <p className="max-w-[150px] truncate text-[10px] text-neutral-500 transition-colors duration-200 group-hover:text-neutral-400 sm:max-w-xs sm:text-xs">
              {transaction.receiver_upi}
            </p>
            <span className="hidden text-xs text-neutral-700 sm:inline">•</span>
            <p className="text-[10px] text-neutral-500 transition-colors duration-200 group-hover:text-neutral-400 sm:text-xs">
              {formattedDate}
            </p>
          </div>
        </div>
      </div>

      {/* Amount */}
      <span
        className={cn(
          "ml-2 text-xs font-medium sm:text-sm",
          isReceived ? "text-emerald-400" : "text-rose-400",
        )}
      >
        {formatCurrency(Math.abs(transaction.amount))}
      </span>
    </div>
  );
}

"use client";

import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import {
  ForkKnife,
  ShoppingBasket,
  MapPin,
  Plane,
  Coffee,
  Stethoscope,
  Shirt,
  GraduationCap,
  Coins,
  MoreHorizontal,
  Home,
  Zap,
  Wrench,
  ShieldCheck,
  Clapperboard,
  Laptop,
  Wallet,
  AlertTriangle,
  HeartHandshake,
} from "lucide-react";
import Link from "next/link";

const categoryIcons = {
  // Food and Groceries
  groceries: ShoppingBasket,
  "dining out": ForkKnife,
  "coffee & snacks": Coffee,
  "meal subscriptions": ShoppingBasket,

  // Transportation
  fuel: MapPin,
  "public transport": Plane,
  "ride-sharing": MapPin,
  "vehicle maintenance & repairs": Wrench,
  "auto insurance": ShieldCheck,
  "parking & tolls": Wallet,

  // Housing
  "rent/mortgage": Home,
  "property taxes": Zap,
  "home insurance": ShieldCheck,
  utilities: Zap,
  "home maintenance & repairs": Wrench,

  // Health and Wellness
  "health insurance": Stethoscope,
  "doctor visits": Stethoscope,
  "medicine & prescriptions": Stethoscope,
  "dental & vision care": Stethoscope,
  "gym & fitness": Stethoscope,

  // Finances
  "loan payments": Coins,
  "credit card payments": Wallet,
  "savings & investments": Coins,
  taxes: Wallet,

  // Entertainment
  "movies & shows": Clapperboard,
  subscriptions: Clapperboard,
  "events & concerts": Clapperboard,
  "hobbies & recreation": Clapperboard,
  gaming: Clapperboard,

  // Shopping and Personal Expenses
  "clothing & accessories": Shirt,
  "electronics & gadgets": Laptop,
  "beauty & personal care": Shirt,
  "home decor & furniture": Home,

  // Education
  "courses & certifications": GraduationCap,
  "books & study materials": GraduationCap,
  "school fees": GraduationCap,

  // Gifts
  "gifts for friends & family": HeartHandshake,
  "charity & donations": HeartHandshake,

  // Miscellaneous
  "unplanned expenses": AlertTriangle,
  "atm withdrawals": Wallet,
  "service fees": Wallet,

  // Fallback
  default: MoreHorizontal,
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
  const amountColor = isReceived ? "text-emerald-500" : "text-rose-500";

  // Normalize category to lowercase for icon matching
  const normalizedCategory = transaction.category.toLowerCase();
  const CategoryIcon =
    categoryIcons[normalizedCategory as keyof typeof categoryIcons] ||
    categoryIcons.default;

  const formattedDate = new Date(
    transaction.transaction_date!,
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="group relative">
      <Link
        href={`/payees/${transaction.receiver_id}`}
        className="absolute inset-0 z-10"
      />
      <div className="relative flex cursor-pointer items-center overflow-hidden rounded-xl border border-neutral-800 px-4 py-3 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/50">
        {/* Background Hover Effect */}
        <div className="absolute inset-0 z-0 bg-neutral-800 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

        {/* Icon with dynamic category */}
        <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 transition-colors group-hover:bg-neutral-700">
          <CategoryIcon className="h-5 w-5" />
        </div>

        {/* Transaction Details */}
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{transaction.receiver_name}</p>
            <span className={cn("ml-2 text-sm font-medium", amountColor)}>
              {formatCurrency(Math.abs(transaction.amount))}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-neutral-500">
              {transaction.receiver_upi}
            </p>
            <p className="text-xs text-neutral-500">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

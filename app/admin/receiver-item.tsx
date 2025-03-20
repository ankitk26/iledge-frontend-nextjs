"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import CategoryDialog from "./category-dialog";
import Link from "next/link";

interface Props {
  receiver: {
    receiver_id: number;
    receiver_upi_id: string;
    name: string;
    category_id: number;
    category_description: string;
    category_icon: string;
  };
}

export default function ReceiverItem({ receiver }: Props) {
  // Get first letter of name for avatar
  const firstLetter = receiver.name.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-950/50 p-3 transition-colors duration-200 hover:bg-neutral-900/20 sm:flex-row sm:items-center md:p-4">
      <div className="flex items-center gap-3">
        <Avatar className="bg-primary/10 text-primary h-8 w-8 md:h-10 md:w-10">
          <AvatarFallback>{firstLetter}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <Link
            href={`/payees/${receiver.receiver_id}`}
            className="hover:underline"
          >
            <h2 className="max-w-[200px] truncate text-sm font-medium md:max-w-none md:text-base">
              {receiver.name}
            </h2>
          </Link>
          <p className="max-w-[200px] truncate text-xs text-neutral-500 md:max-w-none md:text-sm">
            {receiver.receiver_upi_id}
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between sm:mt-0 sm:justify-normal sm:gap-3">
        <span className="max-w-[150px] truncate rounded-full bg-neutral-800/40 px-2 py-0.5 text-xs font-medium text-neutral-400 md:px-2.5 md:py-1">
          {receiver.category_description}
        </span>
        <CategoryDialog receiver={receiver} />
      </div>
    </div>
  );
}

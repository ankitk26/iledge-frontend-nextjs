"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import CategoryDialog from "./category-dialog";

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
    <div className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-950/50 p-4 transition-colors duration-200 hover:bg-neutral-900/20">
      <div className="flex items-center gap-3">
        <Avatar className="bg-primary/10 text-primary h-10 w-10">
          <AvatarFallback>{firstLetter}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="font-medium">{receiver.name}</h2>
          <p className="text-sm text-neutral-500">{receiver.receiver_upi_id}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-neutral-800/40 px-2.5 py-1 text-xs font-medium text-neutral-400">
          {receiver.category_description}
        </span>
        <CategoryDialog receiver={receiver} />
      </div>
    </div>
  );
}

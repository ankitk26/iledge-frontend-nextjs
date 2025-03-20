"use client";

import ErrorMessage from "@/components/error-message";
import { Skeleton } from "@/components/ui/skeleton";
import getReceivers from "@/queries/get-receivers";
import { useQuery } from "@tanstack/react-query";
import ReceiverItem from "./receiver-item";

export default function AdminPage() {
  const {
    data: receivers,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["receivers"],
    queryFn: getReceivers,
  });

  if (isPending) {
    return (
      <div className="flex flex-col items-stretch gap-3 px-2 md:gap-4 md:px-0">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (isError || !receivers) {
    return <ErrorMessage />;
  }

  return (
    <div className="px-2 md:px-0">
      <h1 className="text-lg font-bold md:text-2xl">Manage receivers</h1>
      <div className="mt-4 flex flex-col items-stretch gap-3 md:mt-8 md:gap-6">
        {receivers &&
          receivers.map((receiver) => (
            <ReceiverItem key={receiver.receiver_id} receiver={receiver} />
          ))}
      </div>
    </div>
  );
}

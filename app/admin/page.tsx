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
      <div className="flex flex-col items-stretch gap-4">
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
    <div>
      <h1 className="text-2xl font-bold">Manage receivers</h1>
      <div className="mt-8 flex flex-col items-stretch gap-6">
        {receivers &&
          receivers.map((receiver) => (
            <ReceiverItem key={receiver.receiver_id} receiver={receiver} />
          ))}
      </div>
    </div>
  );
}

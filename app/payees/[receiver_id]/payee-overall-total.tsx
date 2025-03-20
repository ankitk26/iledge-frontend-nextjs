import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/format-currency";
import { getTransactions } from "@/queries/get-transactions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function PayeeOverallTotal() {
  const { receiver_id } = useParams() as {
    receiver_id: string;
  };

  const { data: totalAmount, isPending } = useQuery({
    queryKey: ["transactions_by_receiver", receiver_id],
    queryFn: () =>
      getTransactions({
        receiver_id: parseInt(receiver_id),
      }),
    select: (data) => {
      return data.reduce((a, b) => a + b.amount, 0);
    },
  });

  if (isPending) {
    return <Skeleton className="h-8 w-32 bg-neutral-800" />;
  }

  return (
    <Badge
      variant="outline"
      className="mt-8 w-fit bg-neutral-900 px-4 py-2 lg:mt-0"
    >
      Total: {formatCurrency(totalAmount ?? 0)}
    </Badge>
  );
}

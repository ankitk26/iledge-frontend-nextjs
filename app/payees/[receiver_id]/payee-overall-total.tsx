import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/format-currency";
import { getTransactionsByPayee } from "@/queries/get-transactions-by-payee";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function PayeeOverallTotal() {
  const { receiver_id } = useParams() as {
    receiver_id: string;
  };

  const { data: totalAmount, isPending } = useQuery({
    queryKey: ["transactions_by_receiver", receiver_id],
    queryFn: () => getTransactionsByPayee(parseInt(receiver_id)),
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
      className="flex items-center gap-2 bg-neutral-900 px-4 py-2"
    >
      Total: {formatCurrency(totalAmount ?? 0)}
    </Badge>
  );
}

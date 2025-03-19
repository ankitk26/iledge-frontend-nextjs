import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/format-currency";
import { IndianRupee } from "lucide-react";
import { usePayee } from "./use-payee";

export default function DashboardHeader() {
  const { data, isPending } = usePayee({ month: null, year: null });

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">Spending Dashboard</h1>
      {isPending ? (
        <Skeleton className="h-8 w-32 bg-neutral-800" />
      ) : (
        <Badge
          variant="outline"
          className="flex items-center gap-2 bg-neutral-900 px-4 py-2"
        >
          <IndianRupee size={16} />
          Total: {formatCurrency(data?.totalSpent as number)}
        </Badge>
      )}
    </div>
  );
}

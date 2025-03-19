import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { usePayee } from "@/hooks/use-payee";
import { formatCurrency } from "@/lib/format-currency";
import FilterTabs from "./filter-tabs";
import MonthYearFilters from "./month-year-filters";

export default function DashboardHeader() {
  const { data, isPending } = usePayee({});

  if (isPending) {
    return (
      <>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Spending Dashboard
          </h1>
          <div className="flex items-center gap-5">
            <Skeleton className="h-8 w-16 bg-neutral-800" />
            <Skeleton className="h-8 w-32 bg-neutral-800" />
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          <Skeleton className="h-8 w-32 bg-neutral-800" />
          <Skeleton className="h-8 w-32 bg-neutral-800" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Spending Dashboard
        </h1>

        <div className="flex items-stretch gap-8">
          <FilterTabs />
          <Badge
            variant="outline"
            className="flex items-center gap-2 bg-neutral-900 px-4 py-2"
          >
            Total: {formatCurrency(data?.totalSpent as number)}
          </Badge>
        </div>
      </div>

      <MonthYearFilters />
    </>
  );
}

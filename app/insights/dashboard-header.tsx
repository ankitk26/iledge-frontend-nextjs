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
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Spending Dashboard
          </h1>
          <div className="flex items-center gap-3 sm:gap-5">
            <Skeleton className="h-8 w-16 bg-neutral-800" />
            <Skeleton className="h-8 w-32 bg-neutral-800" />
          </div>
        </div>
        <div className="mt-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-end sm:gap-4 sm:space-y-0">
          <Skeleton className="h-8 w-full bg-neutral-800 sm:w-32" />
          <Skeleton className="h-8 w-full bg-neutral-800 sm:w-32" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Spending Dashboard
        </h1>

        <div className="flex flex-col space-y-3 sm:flex-row sm:items-stretch sm:gap-4 sm:space-y-0 md:gap-8">
          <FilterTabs />
          <Badge
            variant="outline"
            className="flex items-center justify-center gap-2 bg-neutral-900 px-4 py-2"
          >
            Total: {formatCurrency(data?.totalSpent as number)}
          </Badge>
        </div>
      </div>

      <MonthYearFilters />
    </>
  );
}

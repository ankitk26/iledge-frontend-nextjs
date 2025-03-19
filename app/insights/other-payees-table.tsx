import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/format-currency";
import { Search } from "lucide-react";
import { useState } from "react";
import TableSkeleton from "./table-skeleton";
import { calculatePercentage, usePayee } from "@/hooks/use-payee";

type Spender = {
  name: string;
  amount_spent: number;
};

export default function OtherPayeesTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isPending } = usePayee({
    month: null,
    year: null,
    searchTerm,
  });

  return (
    <Card className="border-neutral-800 bg-neutral-900">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl">All Payees</CardTitle>

            <CardDescription>
              {isPending ? (
                <Skeleton className="h-4 w-48 bg-neutral-700" />
              ) : (
                `Showing ${data?.filteredSpenders?.length || 0} of ${data?.payeesCount || 0} payees`
              )}
            </CardDescription>
          </div>

          {!isPending && (
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500" />
              <Input
                placeholder="Search payees..."
                className="border-neutral-800 bg-neutral-800 pl-9 text-sm focus-visible:ring-neutral-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900 max-h-96 overflow-y-auto px-4 py-2">
          {isPending ? (
            <TableSkeleton />
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-b border-neutral-700">
                  <TableHead className="w-[60px] font-bold">Rank</TableHead>
                  <TableHead className="font-bold">Payee</TableHead>
                  <TableHead className="text-right font-bold">Amount</TableHead>
                  <TableHead className="w-[100px] text-right font-bold">
                    % of Total
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="text-xs">
                {data?.filteredSpenders?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-32 text-center text-neutral-400"
                    >
                      No payees found matching your search
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.filteredSpenders?.map(
                    (spender: Spender, index: number) => (
                      <TableRow
                        key={spender.name}
                        className="border-neutral-800 hover:bg-neutral-800"
                      >
                        <TableCell className="py-5">{index + 1}</TableCell>
                        <TableCell
                          className="max-w-xs truncate"
                          title={spender.name}
                        >
                          {spender.name}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {formatCurrency(spender.amount_spent)}
                        </TableCell>
                        <TableCell className="text-right">
                          {calculatePercentage(
                            spender.amount_spent,
                            data.totalSpent,
                          )}
                          %
                        </TableCell>
                      </TableRow>
                    ),
                  )
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-center gap-4 border-t border-neutral-700 px-4 py-4 sm:flex-row sm:justify-between">
        <span className="text-sm text-neutral-400">
          {data?.filteredSpenders?.length} payees
        </span>
        <span className="text-sm font-medium text-neutral-300">
          {formatCurrency(data?.filteredTotalSpent ?? 0)} total
        </span>
      </CardFooter>
    </Card>
  );
}

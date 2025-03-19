import { Skeleton } from "@/components/ui/skeleton";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

export default function TableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-neutral-800">
          <TableHead className="w-[50px]">Rank</TableHead>
          <TableHead>Merchant</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="w-[100px] text-right">% of Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(10)].map((_, index) => (
          <TableRow
            key={index}
            className="border-neutral-800 hover:bg-neutral-800"
          >
            <TableCell className="py-5">
              <Skeleton className="h-4 w-4 bg-neutral-700" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-full bg-neutral-700" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="ml-auto h-4 w-24 bg-neutral-700" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="ml-auto h-4 w-12 bg-neutral-700" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

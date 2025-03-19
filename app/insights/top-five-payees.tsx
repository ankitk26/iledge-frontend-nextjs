import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/format-currency";
import { TrendingUp } from "lucide-react";
import TopSpendersSkeleton from "./top-spender-skeleton";
import { calculatePercentage, usePayee } from "./use-payee";

type Spender = {
  name: string;
  amount_spent: number;
};

export default function TopFivePayees() {
  const { data, isPending } = usePayee({ month: null, year: null });

  return (
    <Card className="border-neutral-800 bg-neutral-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <TrendingUp className="text-emerald-500" size={20} />
          Top 5 Payees by Spending
        </CardTitle>
        <CardDescription>
          Payees with the highest spending amounts
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <TopSpendersSkeleton />
        ) : (
          data && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
              {data.topFivePayees?.map((spender: Spender, index: number) => (
                <Card
                  key={index}
                  className="border-neutral-700 bg-neutral-800 transition-all hover:border-neutral-600"
                >
                  <CardHeader className="pb-2">
                    <CardTitle
                      className="truncate text-sm font-medium"
                      title={spender.name}
                    >
                      {spender.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {formatCurrency(spender.amount_spent)}
                    </div>
                    <div className="mt-1 text-xs text-neutral-400">
                      {calculatePercentage(
                        spender.amount_spent,
                        data.totalSpent,
                      )}
                      % of total
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
}

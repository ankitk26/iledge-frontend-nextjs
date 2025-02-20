import { formatCurrency } from "@/lib/format-currency";
import { ArrowDown, ArrowUp } from "lucide-react";
import { CardFooter } from "./ui/card";

interface Props {
  budget: number;
  currentMonthExpenses: number;
  previousMonthExpenses: number;
}

export default function SummaryCompareCardFooter({
  budget,
  currentMonthExpenses,
  previousMonthExpenses,
}: Props) {
  const margin = Math.abs(
    Math.round(
      ((currentMonthExpenses - previousMonthExpenses) / currentMonthExpenses) *
        100
    )
  );

  return (
    <CardFooter className="flex flex-col gap-2">
      <div
        className={`font-bold ${
          currentMonthExpenses >= budget ? "text-rose-500" : "text-emerald-500"
        }`}
      >
        {currentMonthExpenses >= budget
          ? "Budget exceeded!"
          : `${Math.round((currentMonthExpenses / budget) * 100)}% budget used`}
      </div>
      <div className="text-sm flex items-center gap-2">
        <span>vs {formatCurrency(previousMonthExpenses)} last month</span>
        <div
          className={`flex text-sm items-center rounded-full px-2 ${
            margin > 0
              ? "text-emerald-500 bg-emerald-100"
              : "text-rose-500 bg-rose-100"
          }`}
        >
          {margin < 0 ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}

          <span>{`${margin}%`}</span>
        </div>
      </div>
    </CardFooter>
  );
}

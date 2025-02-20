"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import SummaryCompareCardContent from "./summary-compare-card-content";
import SummaryCompareCardFooter from "./summary-compare-card-footer";

export function ExpenseBudgetChart({
  currentMonthExpenses,
  previousMonthExpenses,
}: {
  currentMonthExpenses: number;
  previousMonthExpenses: number;
}) {
  const budget = 30000;

  return (
    <Card className="flex flex-col p-6">
      <CardHeader className="mx-auto py-0">
        <CardTitle>Current month expenses</CardTitle>
      </CardHeader>
      <SummaryCompareCardContent
        budget={budget}
        currentMonthExpenses={currentMonthExpenses}
      />
      <SummaryCompareCardFooter
        budget={budget}
        currentMonthExpenses={currentMonthExpenses}
        previousMonthExpenses={previousMonthExpenses}
      />
    </Card>
  );
}

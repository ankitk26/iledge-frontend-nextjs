import { db } from "@/db";
import { transactions } from "@/db/schema";
import { sql } from "drizzle-orm";
import { ExpenseBudgetChart } from "./expense-budget-chart";

export default async function CurrentMonthExpenses() {
  const currentMonthTransactions = await db
    .select({
      totalAmount: sql<number>`sum(amount)::float`,
    })
    .from(transactions)
    .where(
      sql`DATE_TRUNC('month', transaction_date) = DATE_TRUNC('month', NOW())`
    )
    .then((data) => data[0].totalAmount);

  return (
    <div className="flex items-center">
      <ExpenseBudgetChart monthlyExpenses={currentMonthTransactions} />
    </div>
  );
}

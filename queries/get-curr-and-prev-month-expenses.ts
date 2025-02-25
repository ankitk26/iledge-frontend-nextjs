import { db } from "@/db";
import { transactions } from "@/db/schema";
import { sql } from "drizzle-orm";

export function getCurrAndPrevMonthExpenses() {
  return db
    .select({
      month: sql<string>`DATE_TRUNC('month', transaction_date)::date`,
      total_amount: sql<number>`round(sum(amount))::float`,
    })
    .from(transactions)
    .where(
      sql`DATE_TRUNC('month', transaction_date) in (DATE_TRUNC('month', NOW()), DATE_TRUNC('month', NOW() - INTERVAL '1 ,month'))`
    )
    .groupBy(sql`DATE_TRUNC('month', transaction_date)`)
    .orderBy(sql`DATE_TRUNC('month', transaction_date)`);
}

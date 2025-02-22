import { db } from "@/db";
import { transactions } from "@/db/schema";
import { sql } from "drizzle-orm";

export function currMonthWeeklyExpenses() {
  return db
    .select({
      week_no: sql<string>`concat('week', row_number() over (partition by date_trunc('month', now()) order by date_trunc('month', now())))`,
      total_amount: sql<number>`sum(amount)::float`,
    })
    .from(transactions)
    .where(
      sql`DATE_TRUNC('month', transaction_date) = DATE_TRUNC('month', NOW())`
    )
    .groupBy(sql`DATE_TRUNC('week', transaction_date)`)
    .orderBy(sql`DATE_TRUNC('week', transaction_date)`);
}

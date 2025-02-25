import { db } from "@/db";
import { transactions } from "@/db/schema";
import { sql } from "drizzle-orm";

export function getMonthlyTotals() {
  return db
    .select({
      year_value: sql<string>`EXTRACT(YEAR FROM transaction_date)::int`,
      month_value: sql<string>`EXTRACT(MONTH FROM transaction_date)::int`,
      month_year: sql<number>`TO_CHAR(transaction_date, 'Mon YYYY')`,
      total_amount: sql<number>`round(SUM(amount))::float`,
    })
    .from(transactions)
    .groupBy(
      sql`EXTRACT(YEAR FROM transaction_date), EXTRACT(MONTH FROM transaction_date), TO_CHAR(transaction_date, 'Mon YYYY')`
    )
    .orderBy(
      sql`EXTRACT(YEAR FROM transaction_date), EXTRACT(MONTH FROM transaction_date)`
    );
}

"use server";

import { db } from "@/db";
import { transactions } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function getTransactionsCountByReceiver(receiver_id: number) {
  const monthly_transactions = db.$with("monthly_transactions").as(
    db
      .select({
        month_date:
          sql<Date>`cast(date_trunc('month',transactions.transaction_date) as date)`.as(
            "month_date",
          ),
        month_year:
          sql<string>`to_char(transactions.transaction_date, 'Mon yyyy')`.as(
            "month_year",
          ),
        transaction_id: sql`transactions.id`.as("transaction_id"),
      })
      .from(transactions)
      .where(eq(transactions.receiver_id, receiver_id)),
  );

  console.log(monthly_transactions);

  return db
    .with(monthly_transactions)
    .select({
      month_date: sql<string>`month_date`.as("month_date"),
      month_year: monthly_transactions.month_year,
      transaction_count: sql<number>`count(monthly_transactions.transaction_id)::integer`,
    })
    .from(monthly_transactions)
    .groupBy(monthly_transactions.month_date, monthly_transactions.month_year)
    .orderBy(monthly_transactions.month_date);
}

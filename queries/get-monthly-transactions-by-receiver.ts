"use server";

import { db } from "@/db";
import { transactions } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function getMonthlyTransactionsByReceiver(receiver_id: number) {
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
        amount: sql<number>`transactions.amount::float`.as("amount"),
      })
      .from(transactions)
      .where(eq(transactions.receiver_id, receiver_id)),
  );

  return db
    .with(monthly_transactions)
    .select({
      month_date: sql<string>`month_date`.as("month_date"),
      month_year: monthly_transactions.month_year,
      total_amount: sql<number>`sum(monthly_transactions.amount)::float`,
    })
    .from(monthly_transactions)
    .groupBy(monthly_transactions.month_date, monthly_transactions.month_year)
    .orderBy(monthly_transactions.month_date);
}

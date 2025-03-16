"use server";

import { db } from "@/db";
import { transactions } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function getDailyTransactionsByReceiver(receiver_id: number) {
  const daily_transactions = db.$with("daily_transactions").as(
    db
      .select({
        transaction_date:
          sql<Date>`cast(transactions.transaction_date as date)`.as(
            "transaction_date",
          ),
        amount: sql<number>`transactions.amount::float`.as("amount"),
      })
      .from(transactions)
      .where(eq(transactions.receiver_id, receiver_id)),
  );

  return db
    .with(daily_transactions)
    .select({
      transaction_date:
        sql<string>`to_char(daily_transactions.transaction_date, 'DD Mon YY')`.as(
          "formatted_date",
        ),
      total_amount: sql<number>`sum(daily_transactions.amount)::float`,
    })
    .from(daily_transactions)
    .groupBy(daily_transactions.transaction_date)
    .orderBy(daily_transactions.transaction_date);
}

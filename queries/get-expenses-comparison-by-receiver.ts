"use server";

import { db } from "@/db";
import { transactions } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function getExpensesComparisonByReceiver(receiver_id: string) {
  // First, get the current and previous month dates directly from PostgreSQL
  const dateResults = await db.execute(
    sql`SELECT DATE_TRUNC('month', NOW())::date as current_month, DATE_TRUNC('month', NOW() - INTERVAL '1 month')::date as previous_month`,
  );

  const currentMonthStr = dateResults[0].current_month;
  const previousMonthStr = dateResults[0].previous_month;

  // Get the transaction data
  const transactionResults = await db
    .select({
      month: sql<string>`DATE_TRUNC('month', transaction_date)::date`,
      total_amount: sql<number>`round(sum(amount))::float`,
    })
    .from(transactions)
    .where(
      sql`DATE_TRUNC('month', transaction_date) in (DATE_TRUNC('month', NOW()), DATE_TRUNC('month', NOW() - INTERVAL '1 month')) and receiver_id = ${receiver_id}`,
    )
    .groupBy(sql`DATE_TRUNC('month', transaction_date)`)
    .orderBy(sql`DATE_TRUNC('month', transaction_date)`);

  // Create a normalized result with both months
  const normalizedResults = [
    {
      month: previousMonthStr,
      total_amount: 0,
    },
    {
      month: currentMonthStr,
      total_amount: 0,
    },
  ];

  // Fill in the actual values if we have them
  transactionResults.forEach((result) => {
    if (result.month === previousMonthStr) {
      normalizedResults[0].total_amount = result.total_amount;
    } else if (result.month === currentMonthStr) {
      normalizedResults[1].total_amount = result.total_amount;
    }
  });

  return normalizedResults;
}

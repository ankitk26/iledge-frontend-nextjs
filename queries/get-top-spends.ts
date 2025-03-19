"use server";

import { db } from "@/db";
import { receivers, transactions } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";

export async function getTopSpends({
  month,
  year,
}: {
  month: number | null;
  year: number | null;
}) {
  return db
    .select({
      name: sql<string>`upper(receivers.name)`.as("name"),
      amount_spent: sql<number>`sum(transactions.amount)::float`,
    })
    .from(transactions)
    .innerJoin(receivers, eq(transactions.receiver_id, receivers.id))
    .where(
      and(
        month !== null
          ? sql`extract(month from transactions.transaction_date) = ${month}`
          : sql`true`,
        year !== null
          ? sql`extract(year from transactions.transaction_date) = ${year}`
          : sql`true`,
      ),
    )
    .groupBy(sql`upper(receivers.name)`)
    .orderBy(sql`2 desc`);
}

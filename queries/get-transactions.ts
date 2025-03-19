"use server";

import { db } from "@/db";
import { categories, receivers, transactions } from "@/db/schema";
import { desc, eq, sql, and } from "drizzle-orm";

type Props = {
  receiver_id?: number | null;
  month?: number | null;
  year?: number | null;
};

export async function getTransactions({
  receiver_id = null,
  month = null,
  year = null,
}: Props = {}) {
  return db
    .select({
      id: transactions.id,
      receiver_id: transactions.receiver_id,
      receiver_name: receivers.name,
      receiver_upi: receivers.receiver_upi_id,
      transaction_date: transactions.transaction_date,
      amount: sql<number>`transactions.amount::float`,
      category_id: categories.id,
      category_description: categories.description,
      category_icon: categories.icon_name,
    })
    .from(transactions)
    .innerJoin(receivers, eq(transactions.receiver_id, receivers.id))
    .innerJoin(
      categories,
      sql`case when transactions.category_id = 0 then receivers.category_id else transactions.category_id end = categories.id`,
    )
    .where(
      and(
        receiver_id !== null ? eq(receivers.id, receiver_id) : sql`true`,
        month !== null
          ? sql`extract(month from transaction_date) = ${month}`
          : sql`true`,
        year !== null
          ? sql`extract(year from transaction_date) = ${year}`
          : sql`true`,
      ),
    )
    .orderBy(desc(transactions.transaction_date));
}

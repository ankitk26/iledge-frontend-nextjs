"use server";

import { db } from "@/db";
import { categories, receivers, transactions } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

export async function getTransactionsByPayee(receiver_id: number) {
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
      sql`case when transactions.category_id = 0 then receivers.category_id else transactions.category_id end  = categories.id`,
    )
    .where(sql`receivers.id = ${receiver_id}`)
    .orderBy(desc(transactions.transaction_date));
}

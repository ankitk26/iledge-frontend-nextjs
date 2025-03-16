"use server";

import { db } from "@/db";
import { categories, receivers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getReceiverById(receiver_id: number) {
  return db
    .select({
      receiver_id: receivers.id,
      receiver_upi_id: receivers.receiver_upi_id,
      name: receivers.name,
      category_id: receivers.category_id,
      category_description: categories.description,
    })
    .from(receivers)
    .innerJoin(categories, eq(receivers.category_id, categories.id))
    .where(eq(receivers.id, receiver_id));
}

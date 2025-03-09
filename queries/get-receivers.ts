"use server";

import { db } from "@/db";
import { categories, receivers } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function getReceivers() {
  return db
    .select({
      receiver_id: receivers.id,
      receiver_upi_id: receivers.receiver_upi_id,
      name: receivers.name,
      category_id: receivers.category_id,
      category_description: categories.description,
      category_icon: categories.icon_name,
    })
    .from(receivers)
    .innerJoin(categories, eq(receivers.category_id, categories.id))
    .orderBy(receivers.name, receivers.created_at);
}

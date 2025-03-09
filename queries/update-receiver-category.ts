"use server";

import { db } from "@/db";
import { receivers } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updateReceiverCategory(
  receiverId: number,
  categoryId: number,
) {
  return db
    .update(receivers)
    .set({ category_id: categoryId })
    .where(eq(receivers.id, receiverId));
}

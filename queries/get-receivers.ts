import { db } from "@/db";
import { receivers } from "@/db/schema";

export function getReceivers() {
  return db.select().from(receivers);
}

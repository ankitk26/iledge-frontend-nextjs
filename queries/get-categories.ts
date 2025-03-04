import { db } from "@/db";
import { categories } from "@/db/schema";

export function getCategories() {
  return db.select().from(categories);
}

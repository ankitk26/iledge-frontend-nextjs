"use server";

import { db } from "@/db";
import { categories } from "@/db/schema";

export default async function getCategories() {
  return db.select().from(categories).orderBy(categories.parent_category);
}

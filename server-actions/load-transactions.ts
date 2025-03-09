"use server";

import { revalidatePath } from "next/cache";

export async function loadTransactions() {
  await fetch(`${process.env.BACKEND_API_URL}/new-transactions`, {
    method: "POST",
  });
  revalidatePath("/");
}

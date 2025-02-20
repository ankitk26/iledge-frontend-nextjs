"use server";

import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";

export const loadTransactions = actionClient.action(async () => {
  await fetch(`${process.env.BACKEND_API_URL}/new-transactions`, {
    method: "POST",
  });
  revalidatePath("/");
});

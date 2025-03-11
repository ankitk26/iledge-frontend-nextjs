"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function loadTransactions() {
  const headersList = await headers();
  const headersObj = new Headers();

  headersList.forEach((value: string, key: string) => {
    headersObj.append(key, value);
  });

  // Check if user is authenticated
  const session = await auth.api.getSession({
    headers: headersObj,
  });

  //  Redirect user to login page if not authenticated
  if (!session) {
    redirect("/login");
  }

  // Load all transactions in the backend
  await fetch(`${process.env.BACKEND_API_URL}/new-transactions`, {
    method: "POST",
  });

  // Refresh cache in home page
  revalidatePath("/");
}

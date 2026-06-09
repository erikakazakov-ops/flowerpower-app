"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import type { Product } from "@/lib/supabase";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

export async function addProduct(
  data: Omit<Product, "id">
): Promise<{ error?: string }> {
  const supabase = getAdminClient();
  const { error } = await supabase.from("products").insert([data]);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/kataloog");
  revalidatePath("/admin");
  return {};
}

export async function updateProduct(
  id: string,
  data: Partial<Omit<Product, "id">>
): Promise<{ error?: string }> {
  const supabase = getAdminClient();
  const { error } = await supabase.from("products").update(data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/kataloog");
  revalidatePath("/admin");
  return {};
}

export async function deleteProduct(id: string): Promise<{ error?: string }> {
  const supabase = getAdminClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/kataloog");
  revalidatePath("/admin");
  return {};
}

export async function toggleStock(
  id: string,
  inStock: boolean
): Promise<{ error?: string }> {
  const supabase = getAdminClient();
  const { error } = await supabase
    .from("products")
    .update({ in_stock: !inStock })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/kataloog");
  revalidatePath("/admin");
  return {};
}

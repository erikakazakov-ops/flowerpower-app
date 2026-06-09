import { createClient } from "@supabase/supabase-js";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  in_stock: boolean;
};

function createServerClient() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}

export async function getProducts(): Promise<Product[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name");
  if (error) throw error;
  return data ?? [];
}

import { getProducts } from "@/lib/supabase";
import AdminPageClient from "./AdminPageClient";

export default async function AdminPage() {
  const products = await getProducts();
  return <AdminPageClient initialProducts={products} />;
}

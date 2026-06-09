import { getProducts } from "@/lib/supabase";
import KatalogiClient from "./KatalogiClient";

export default async function KatalogiPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#EDE0FF] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#E8195A] uppercase mb-4">Meie kollektsioon</p>
          <h1
            className="text-5xl sm:text-6xl text-gray-900"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            Lillekataloog
          </h1>
        </div>
      </div>
      <KatalogiClient products={products} />
    </div>
  );
}

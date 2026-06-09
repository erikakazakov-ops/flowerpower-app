"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/supabase";

const CATEGORIES = ["Kõik", "Roosid", "Tulipiid", "Peonid", "Päevalilled", "Orhideed", "Segakimbud", "Lavendel", "Hortensiad"];

export default function KatalogiClient({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("Kõik");
  const [sortBy, setSortBy] = useState("default");
  const { addItem } = useCart();
  const [added, setAdded] = useState<string | null>(null);

  const filtered = products
    .filter((p) => activeCategory === "Kõik" || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const handleAdd = (product: Product) => {
    if (!product.in_stock) return;
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, type: "product" });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeCategory === cat
                  ? "bg-[#E8195A] text-white"
                  : "bg-[#FFF0F5] text-gray-600 hover:bg-pink-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-white border border-gray-200 text-gray-700 rounded-xl px-4 py-2 text-sm focus:border-[#E8195A] focus:outline-none"
        >
          <option value="default">Vaikimisi</option>
          <option value="price-asc">Hind: odavamast</option>
          <option value="price-desc">Hind: kallimast</option>
          <option value="name">Nimi: A–Z</option>
        </select>
      </div>

      <p className="text-gray-400 text-xs tracking-wide mb-8 uppercase">{filtered.length} toodet</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
          >
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105 ${!product.in_stock ? "grayscale opacity-50" : ""}`}
              />
              {!product.in_stock && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white/80 text-gray-500 font-medium px-4 py-1.5 rounded-full text-xs">Otsas</span>
                </div>
              )}
              <div className="absolute top-3 left-3 bg-white text-xs text-gray-500 px-3 py-1 rounded-full shadow-sm">
                {product.category}
              </div>
              {product.in_stock && (
                <div className="absolute top-3 right-3 bg-green-50 border border-green-200 text-green-600 text-xs px-2.5 py-1 rounded-full">
                  Laos
                </div>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-gray-400 text-xs mb-4 leading-relaxed line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-[#E8195A]">{product.price.toFixed(2)} €</span>
                <button
                  onClick={() => handleAdd(product)}
                  disabled={!product.in_stock}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    !product.in_stock
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : added === product.id
                      ? "bg-green-500 text-white"
                      : "bg-[#E8195A] text-white hover:bg-[#c9144a]"
                  }`}
                >
                  {added === product.id ? "Lisatud" : !product.in_stock ? "Otsas" : "Lisa korvi"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24 text-gray-400">
          <p className="text-lg font-medium text-gray-500 mb-2">Selles kategoorias pole tooteid</p>
          <button onClick={() => setActiveCategory("Kõik")} className="text-[#E8195A] text-sm hover:underline">
            Näita kõiki tooteid
          </button>
        </div>
      )}
    </div>
  );
}

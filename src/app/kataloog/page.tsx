"use client";

import { useState } from "react";
import { products } from "@/lib/data";
import { useCart } from "@/lib/cart";

const categories = ["Kõik", "Roosid", "Tulipiid", "Peonid", "Päevalilled", "Orhideed", "Segakimbud", "Lavendel", "Hortensiad"];

export default function KatalogiPage() {
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

  const handleAdd = (product: typeof products[0]) => {
    if (!product.inStock) return;
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, type: "product" });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[#0d0d0d] py-16 border-b border-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-6xl font-black mb-4">
            Lille<span className="text-[#E8195A]">kataloog</span>
          </h1>
          <p className="text-gray-400 text-lg">Värskelt saabunud, hoolikalt valitud</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-[#E8195A] text-white"
                    : "bg-[#1a1a1a] text-gray-300 hover:bg-[#E8195A]/20 hover:text-[#E8195A] border border-[#2a2a2a]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-xl px-4 py-2 text-sm focus:border-[#E8195A] outline-none"
          >
            <option value="default">Sorteerimi: vaikimisi</option>
            <option value="price-asc">Hind: odavamast</option>
            <option value="price-desc">Hind: kallimast</option>
            <option value="name">Nimi: A–Z</option>
          </select>
        </div>

        <p className="text-gray-500 text-sm mb-6">{filtered.length} toodet</p>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden hover:border-[#E8195A] hover:-translate-y-2 transition-all group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105 ${!product.inStock ? "grayscale opacity-60" : ""}`}
                />
                {!product.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-black/70 text-white font-bold px-4 py-2 rounded-full text-sm">Otsas</span>
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-[#0a0a0a]/80 text-xs text-gray-300 px-3 py-1 rounded-full backdrop-blur-sm">
                  {product.category}
                </div>
                {product.inStock && (
                  <div className="absolute top-3 right-3 bg-green-500/20 border border-green-500/40 text-green-400 text-xs px-2 py-1 rounded-full">
                    Laos
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#E8195A]">{product.price.toFixed(2)} €</span>
                  <button
                    onClick={() => handleAdd(product)}
                    disabled={!product.inStock}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      !product.inStock
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : added === product.id
                        ? "bg-green-500 text-white"
                        : "bg-[#E8195A] text-white hover:bg-[#c9144a] hover:scale-105"
                    }`}
                  >
                    {added === product.id ? "✓ Lisatud" : !product.inStock ? "Otsas" : "Lisa korvi"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-gray-500">
            <div className="text-6xl mb-4">🌿</div>
            <p className="text-xl font-semibold">Selles kategoorias pole tooteid</p>
            <button onClick={() => setActiveCategory("Kõik")} className="mt-4 text-[#E8195A] hover:underline">
              Näita kõiki tooteid
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

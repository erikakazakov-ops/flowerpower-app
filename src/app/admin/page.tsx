"use client";

import { useState } from "react";
import { adminOrders, products, subscriptionPlans } from "@/lib/data";

type Tab = "ülevaade" | "tellimused" | "tooted" | "plaanid";

const statusColor: Record<string, string> = {
  Aktiivne: "bg-green-500/20 text-green-400 border-green-500/30",
  Ootel: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Tühistatud: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("ülevaade");
  const [search, setSearch] = useState("");

  const stats = [
    { label: "Aktiivsed tellimused", value: adminOrders.filter((o) => o.status === "Aktiivne").length, icon: "📦", change: "+12%" },
    { label: "Kuu tulu", value: "€" + adminOrders.filter((o) => o.status === "Aktiivne").reduce((s, o) => s + o.amount, 0), icon: "💰", change: "+8%" },
    { label: "Kokku tellijaid", value: adminOrders.length, icon: "👥", change: "+5%" },
    { label: "Toodete arv", value: products.length, icon: "🌸", change: "0%" },
  ];

  const filteredOrders = adminOrders.filter(
    (o) =>
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#080808]">
      <div className="bg-[#0d0d0d] border-b border-[#1f1f1f] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">
              Admin <span className="text-[#E8195A]">juhtpaneel</span>
            </h1>
            <p className="text-gray-500 text-sm">FlowerPower haldus</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Süsteem töötab</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-[#111] rounded-xl p-1.5 w-fit">
          {(["ülevaade", "tellimused", "tooted", "plaanid"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                tab === t ? "bg-[#E8195A] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {tab === "ülevaade" && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {stats.map((s) => (
                <div key={s.label} className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{s.icon}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.change.startsWith("+") ? "bg-green-500/20 text-green-400" : "bg-gray-700 text-gray-400"}`}>
                      {s.change}
                    </span>
                  </div>
                  <div className="text-3xl font-black text-white mb-1">{s.value}</div>
                  <div className="text-gray-500 text-sm">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Revenue chart placeholder */}
            <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 mb-8">
              <h3 className="font-bold text-lg mb-6">Kuutulu ülevaade</h3>
              <div className="flex items-end gap-3 h-40">
                {[65, 80, 55, 90, 70, 100, 85, 95, 75, 110, 88, 120].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-lg transition-all hover:opacity-80"
                      style={{
                        height: `${(h / 120) * 100}%`,
                        backgroundColor: i === 11 ? "#E8195A" : "#2a2a2a",
                      }}
                    />
                    <span className="text-xs text-gray-600">{["J", "V", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent orders */}
            <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">Viimased tellimused</h3>
              <div className="space-y-3">
                {adminOrders.slice(0, 4).map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-3 border-b border-[#1a1a1a] last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 bg-[#E8195A]/20 rounded-full flex items-center justify-center text-xs font-bold text-[#E8195A]">
                        {order.customer.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.id} · {order.plan}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#E8195A]">{order.amount} €</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColor[order.status]}`}>{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Orders tab */}
        {tab === "tellimused" && (
          <div>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Otsi kliendi, e-posti või tellimuse järgi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-[#111] border border-[#1f1f1f] rounded-xl px-4 py-3 text-white focus:border-[#E8195A] focus:outline-none text-sm"
              />
              <div className="flex gap-2">
                {["Kõik", "Aktiivne", "Ootel", "Tühistatud"].map((status) => (
                  <button key={status} className="px-4 py-2 bg-[#111] border border-[#1f1f1f] rounded-xl text-sm text-gray-400 hover:border-[#E8195A] hover:text-white transition-all">
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1f1f1f]">
                      {["Tellimus", "Klient", "E-post", "Plaan", "Summa", "Staatus", "Kuupäev", "Toimingud"].map((h) => (
                        <th key={h} className="text-left text-xs text-gray-500 font-semibold px-6 py-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b border-[#1a1a1a] hover:bg-[#151515] transition-colors">
                        <td className="px-6 py-4 text-sm font-mono text-[#E8195A]">{order.id}</td>
                        <td className="px-6 py-4 text-sm font-semibold">{order.customer}</td>
                        <td className="px-6 py-4 text-sm text-gray-400">{order.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{order.plan}</td>
                        <td className="px-6 py-4 text-sm font-bold text-[#E8195A]">{order.amount} €</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColor[order.status]}`}>{order.status}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="text-xs text-gray-400 hover:text-white transition-colors">Vaata</button>
                            <button className="text-xs text-[#E8195A] hover:text-red-400 transition-colors">Kustuta</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <p>Kuvatakse {filteredOrders.length} / {adminOrders.length} tellimust</p>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-[#111] border border-[#1f1f1f] rounded-lg hover:border-gray-500 transition-colors">← Eelmine</button>
                <button className="px-3 py-1.5 bg-[#E8195A] text-white rounded-lg">1</button>
                <button className="px-3 py-1.5 bg-[#111] border border-[#1f1f1f] rounded-lg hover:border-gray-500 transition-colors">Järgmine →</button>
              </div>
            </div>
          </div>
        )}

        {/* Products tab */}
        {tab === "tooted" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-400">{products.length} toodet</p>
              <button className="bg-[#E8195A] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#c9144a] transition-colors">
                + Lisa toode
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product) => (
                <div key={product.id} className="bg-[#111] border border-[#1f1f1f] rounded-2xl overflow-hidden hover:border-[#E8195A] transition-all">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                    <div className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full border ${product.inStock ? statusColor["Aktiivne"] : statusColor["Tühistatud"]}`}>
                      {product.inStock ? "Laos" : "Otsas"}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold">{product.name}</h3>
                      <span className="text-[#E8195A] font-black">{product.price.toFixed(2)} €</span>
                    </div>
                    <p className="text-gray-500 text-xs mb-4">{product.category}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 border border-[#2a2a2a] rounded-lg text-xs text-gray-400 hover:border-[#E8195A] hover:text-[#E8195A] transition-all">Muuda</button>
                      <button className="flex-1 py-2 border border-red-900/40 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-all">Kustuta</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Plans tab */}
        {tab === "plaanid" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => (
                <div key={plan.id} className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 hover:border-[#E8195A] transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-black">{plan.name}</h3>
                      {plan.popular && <span className="text-xs bg-[#E8195A]/20 text-[#E8195A] px-2 py-0.5 rounded-full">Populaarne</span>}
                    </div>
                    <span className="text-2xl font-black text-[#E8195A]">{plan.price} €</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <p className="text-xs text-gray-600 mb-2">Aktiivsed tellijad:</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-[#1a1a1a] rounded-full h-2">
                        <div className="bg-[#E8195A] h-2 rounded-full" style={{ width: `${plan.id === "basic" ? 40 : plan.id === "premium" ? 70 : 30}%` }} />
                      </div>
                      <span className="text-sm font-bold">{plan.id === "basic" ? 2 : plan.id === "premium" ? 3 : 1}</span>
                    </div>
                  </div>
                  <button className="w-full py-2.5 border border-[#2a2a2a] rounded-xl text-sm text-gray-400 hover:border-[#E8195A] hover:text-[#E8195A] transition-all">
                    Muuda plaani
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-[#111] border border-[#1f1f1f] rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">Tellimuste jaotus</h3>
              <div className="space-y-4">
                {subscriptionPlans.map((plan) => {
                  const count = adminOrders.filter((o) => o.plan === plan.name && o.status === "Aktiivne").length;
                  const pct = (count / adminOrders.filter((o) => o.status === "Aktiivne").length) * 100;
                  return (
                    <div key={plan.id} className="flex items-center gap-4">
                      <span className="w-20 text-sm text-gray-400">{plan.name}</span>
                      <div className="flex-1 bg-[#1a1a1a] rounded-full h-3">
                        <div className="bg-[#E8195A] h-3 rounded-full transition-all" style={{ width: `${pct || 0}%` }} />
                      </div>
                      <span className="text-sm font-bold w-6">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

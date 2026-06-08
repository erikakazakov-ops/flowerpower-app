"use client";

import { useState } from "react";
import { adminOrders, products, subscriptionPlans } from "@/lib/data";

type Tab = "ülevaade" | "tellimused" | "tooted" | "plaanid";

const statusStyle: Record<string, string> = {
  Aktiivne: "bg-green-50 text-green-700 border-green-200",
  Ootel: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Tühistatud: "bg-red-50 text-red-600 border-red-200",
};

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("ülevaade");
  const [search, setSearch] = useState("");

  const stats = [
    { label: "Aktiivsed tellimused", value: adminOrders.filter((o) => o.status === "Aktiivne").length, change: "+12%" },
    { label: "Kuu tulu", value: "€" + adminOrders.filter((o) => o.status === "Aktiivne").reduce((s, o) => s + o.amount, 0), change: "+8%" },
    { label: "Kokku tellijaid", value: adminOrders.length, change: "+5%" },
    { label: "Toodete arv", value: products.length, change: "" },
  ];

  const filteredOrders = adminOrders.filter(
    (o) =>
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-gray-900" style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}>
              Admin juhtpaneel
            </h1>
            <p className="text-gray-400 text-xs mt-0.5">FlowerPower haldus</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-xs text-gray-400">Süsteem töötab</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white border border-gray-100 rounded-xl p-1 w-fit shadow-sm">
          {(["ülevaade", "tellimused", "tooted", "plaanid"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                tab === t ? "bg-[#E8195A] text-white" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === "ülevaade" && (
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {stats.map((s) => (
                <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-playfair)" }}>{s.value}</span>
                    {s.change && <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{s.change}</span>}
                  </div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 text-sm mb-6">Kuutulu ülevaade</h3>
              <div className="flex items-end gap-2 h-32">
                {[65, 80, 55, 90, 70, 100, 85, 95, 75, 110, 88, 120].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-lg"
                      style={{ height: `${(h / 120) * 100}%`, backgroundColor: i === 11 ? "#E8195A" : "#EDE0FF" }}
                    />
                    <span className="text-xs text-gray-300">{["J","V","M","A","M","J","J","A","S","O","N","D"][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent orders */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 text-sm mb-4">Viimased tellimused</h3>
              <div className="space-y-3">
                {adminOrders.slice(0, 4).map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#FFF0F5] rounded-full flex items-center justify-center text-xs font-bold text-[#E8195A]">
                        {order.customer.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{order.customer}</p>
                        <p className="text-xs text-gray-400">{order.id} · {order.plan}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#E8195A] text-sm">{order.amount} €</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${statusStyle[order.status]}`}>{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Orders */}
        {tab === "tellimused" && (
          <div>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="text"
                placeholder="Otsi kliendi, e-posti või tellimuse järgi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:border-[#E8195A] focus:outline-none placeholder:text-gray-300"
              />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {["Tellimus", "Klient", "E-post", "Plaan", "Summa", "Staatus", "Kuupäev", "Toimingud"].map((h) => (
                        <th key={h} className="text-left text-xs text-gray-400 font-semibold uppercase tracking-wide px-5 py-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-0">
                        <td className="px-5 py-4 text-xs font-mono text-[#E8195A] font-semibold">{order.id}</td>
                        <td className="px-5 py-4 text-sm font-medium text-gray-900">{order.customer}</td>
                        <td className="px-5 py-4 text-xs text-gray-400">{order.email}</td>
                        <td className="px-5 py-4 text-sm text-gray-600">{order.plan}</td>
                        <td className="px-5 py-4 text-sm font-bold text-[#E8195A]">{order.amount} €</td>
                        <td className="px-5 py-4">
                          <span className={`text-xs px-2.5 py-1 rounded-full border ${statusStyle[order.status]}`}>{order.status}</span>
                        </td>
                        <td className="px-5 py-4 text-xs text-gray-400">{order.date}</td>
                        <td className="px-5 py-4">
                          <div className="flex gap-3">
                            <button className="text-xs text-gray-400 hover:text-gray-700 transition-colors">Vaata</button>
                            <button className="text-xs text-red-400 hover:text-red-600 transition-colors">Kustuta</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">{filteredOrders.length} / {adminOrders.length} tellimust</p>
          </div>
        )}

        {/* Products */}
        {tab === "tooted" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-500">{products.length} toodet</p>
              <button className="bg-[#E8195A] text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#c9144a] transition-colors">
                + Lisa toode
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product) => (
                <div key={product.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                    <div className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full border ${product.inStock ? statusStyle["Aktiivne"] : statusStyle["Tühistatud"]}`}>
                      {product.inStock ? "Laos" : "Otsas"}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
                      <span className="text-[#E8195A] font-bold text-sm">{product.price.toFixed(2)} €</span>
                    </div>
                    <p className="text-gray-400 text-xs mb-4">{product.category}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 border border-gray-200 rounded-lg text-xs text-gray-500 hover:border-[#E8195A] hover:text-[#E8195A] transition-all">Muuda</button>
                      <button className="flex-1 py-2 border border-red-100 rounded-lg text-xs text-red-400 hover:bg-red-50 transition-all">Kustuta</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Plans */}
        {tab === "plaanid" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {subscriptionPlans.map((plan) => {
                const count = adminOrders.filter((o) => o.plan === plan.name && o.status === "Aktiivne").length;
                return (
                  <div key={plan.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}>{plan.name}</h3>
                        {plan.popular && <span className="text-xs bg-[#FFF0F5] text-[#E8195A] px-2 py-0.5 rounded-full">Populaarne</span>}
                      </div>
                      <span className="text-xl font-bold text-[#E8195A]">{plan.price} €</span>
                    </div>
                    <p className="text-gray-400 text-xs mb-5">{plan.description}</p>
                    <div className="mb-5">
                      <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                        <span>Aktiivsed tellijad</span>
                        <span>{count}</span>
                      </div>
                      <div className="bg-gray-100 rounded-full h-1.5">
                        <div className="bg-[#E8195A] h-1.5 rounded-full" style={{ width: `${(count / adminOrders.length) * 100}%` }} />
                      </div>
                    </div>
                    <button className="w-full py-2 border border-gray-200 rounded-xl text-xs text-gray-500 hover:border-[#E8195A] hover:text-[#E8195A] transition-all">
                      Muuda plaani
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 text-sm mb-5">Tellimuste jaotus</h3>
              <div className="space-y-4">
                {subscriptionPlans.map((plan) => {
                  const count = adminOrders.filter((o) => o.plan === plan.name && o.status === "Aktiivne").length;
                  const total = adminOrders.filter((o) => o.status === "Aktiivne").length;
                  return (
                    <div key={plan.id} className="flex items-center gap-4">
                      <span className="w-16 text-xs text-gray-400">{plan.name}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div className="bg-[#E8195A] h-2 rounded-full" style={{ width: `${total ? (count / total) * 100 : 0}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 w-4">{count}</span>
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

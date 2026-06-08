"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { subscriptionPlans } from "@/lib/data";
import { useCart } from "@/lib/cart";

type Step = 1 | 2 | 3;

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan");
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [orderDone, setOrderDone] = useState(false);

  const selectedPlan = planId ? subscriptionPlans.find((p) => p.id === planId) : null;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    delivery: "standard",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const orderTotal = selectedPlan
    ? selectedPlan.price
    : total + (form.delivery === "express" ? 5.99 : 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLoading(false);
    setOrderDone(true);
    clearCart();
  };

  if (orderDone) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-black mb-4">Tellimus <span className="text-[#E8195A]">edastatud!</span></h1>
          <p className="text-gray-400 mb-2">Aitäh, {form.firstName}!</p>
          <p className="text-gray-400 mb-8">
            Saatsime kinnituse aadressile <span className="text-white">{form.email}</span>.
            Esimesed lilled saabuvad varsti.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center bg-[#E8195A] text-white px-8 py-4 rounded-full font-bold hover:bg-[#c9144a] transition-colors"
          >
            Tagasi avalehele
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black mb-2">Vormista <span className="text-[#E8195A]">tellimus</span></h1>
        <p className="text-gray-400 mb-10">Turvaline makse Stripe kaudu</p>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-10">
          {[
            { n: 1, label: "Andmed" },
            { n: 2, label: "Tarne" },
            { n: 3, label: "Makse" },
          ].map(({ n, label }) => (
            <div key={n} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step === n
                    ? "bg-[#E8195A] text-white"
                    : step > n
                    ? "bg-green-500 text-white"
                    : "bg-[#2a2a2a] text-gray-500"
                }`}
              >
                {step > n ? "✓" : n}
              </div>
              <span className={`text-sm font-medium ${step === n ? "text-white" : "text-gray-500"}`}>{label}</span>
              {n < 3 && <div className={`w-12 h-px ${step > n ? "bg-[#E8195A]" : "bg-[#2a2a2a]"}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-8">
                  <h2 className="text-xl font-bold mb-6">Isikuandmed</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Eesnimi *</label>
                      <input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="Mari" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:border-[#E8195A] focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Perekonnanimi *</label>
                      <input name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Tamm" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:border-[#E8195A] focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">E-post *</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="mari@gmail.com" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:border-[#E8195A] focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Telefon *</label>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="+372 5555 1234" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:border-[#E8195A] focus:outline-none" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm text-gray-400 mb-1 block">Tänav ja majanumber *</label>
                      <input name="address" value={form.address} onChange={handleChange} required placeholder="Tartu mnt 12" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:border-[#E8195A] focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Linn *</label>
                      <input name="city" value={form.city} onChange={handleChange} required placeholder="Tallinn" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:border-[#E8195A] focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Postiindeks *</label>
                      <input name="zip" value={form.zip} onChange={handleChange} required placeholder="10116" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:border-[#E8195A] focus:outline-none" />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="mt-6 w-full bg-[#E8195A] text-white py-4 rounded-full font-bold hover:bg-[#c9144a] transition-colors"
                  >
                    Jätka tarne juurde →
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-8">
                  <h2 className="text-xl font-bold mb-6">Tarneviis</h2>
                  <div className="space-y-4">
                    {[
                      { value: "standard", label: "Standardtarne", desc: "2–3 tööpäeva", price: "Tasuta" },
                      { value: "express", label: "Kiirtarne", desc: "Järgmine tööpäev", price: "+5.99 €" },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all ${
                          form.delivery === opt.value ? "border-[#E8195A] bg-[#E8195A]/5" : "border-[#2a2a2a] hover:border-gray-600"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="delivery"
                            value={opt.value}
                            checked={form.delivery === opt.value}
                            onChange={handleChange}
                            className="accent-[#E8195A] w-4 h-4"
                          />
                          <div>
                            <div className="font-semibold">{opt.label}</div>
                            <div className="text-sm text-gray-400">{opt.desc}</div>
                          </div>
                        </div>
                        <span className={opt.value === "standard" ? "text-green-400 font-semibold" : "text-white font-semibold"}>
                          {opt.price}
                        </span>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 border-2 border-[#2a2a2a] text-gray-300 py-4 rounded-full font-bold hover:border-gray-500 transition-colors">
                      ← Tagasi
                    </button>
                    <button type="button" onClick={() => setStep(3)} className="flex-1 bg-[#E8195A] text-white py-4 rounded-full font-bold hover:bg-[#c9144a] transition-colors">
                      Jätka makse juurde →
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-8">
                  <h2 className="text-xl font-bold mb-2">Makseandmed</h2>
                  <p className="text-gray-500 text-sm mb-6 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    256-bit SSL krüpteeritud Stripe abil
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Kaardi omaniku nimi</label>
                      <input name="cardName" value={form.cardName} onChange={handleChange} required placeholder="Mari Tamm" className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:border-[#E8195A] focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Kaardi number</label>
                      <input
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={handleChange}
                        required
                        placeholder="4242 4242 4242 4242"
                        maxLength={19}
                        className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:border-[#E8195A] focus:outline-none font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Kehtivusaeg</label>
                        <input name="expiry" value={form.expiry} onChange={handleChange} required placeholder="MM/AA" maxLength={5} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:border-[#E8195A] focus:outline-none font-mono" />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">CVV</label>
                        <input name="cvv" value={form.cvv} onChange={handleChange} required placeholder="123" maxLength={4} className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white focus:border-[#E8195A] focus:outline-none font-mono" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button type="button" onClick={() => setStep(2)} className="flex-1 border-2 border-[#2a2a2a] text-gray-300 py-4 rounded-full font-bold hover:border-gray-500 transition-colors">
                      ← Tagasi
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-[#E8195A] text-white py-4 rounded-full font-bold hover:bg-[#c9144a] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Töötleme...
                        </>
                      ) : (
                        <>Maksa {orderTotal.toFixed(2)} €</>
                      )}
                    </button>
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-4">
                    {["Visa", "MC", "Amex", "PayPal"].map((card) => (
                      <div key={card} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-1 text-xs text-gray-500">
                        {card}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-6">Tellimuse kokkuvõte</h3>

              {selectedPlan ? (
                <div className="flex gap-4 mb-6 bg-[#1a1a1a] rounded-xl p-4">
                  <img src={selectedPlan.image} alt={selectedPlan.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div>
                    <p className="font-bold">{selectedPlan.name} plaan</p>
                    <p className="text-sm text-gray-400">Kuutellimine</p>
                    <p className="text-[#E8195A] font-bold">{selectedPlan.price} €/kuu</p>
                  </div>
                </div>
              ) : items.length > 0 ? (
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 bg-[#1a1a1a] rounded-xl p-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-gray-500">×{item.quantity}</p>
                      </div>
                      <p className="text-sm text-[#E8195A] font-bold">{(item.price * item.quantity).toFixed(2)} €</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm mb-6">Ostukorv on tühi</p>
              )}

              <div className="space-y-3 border-t border-[#2a2a2a] pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Vahesumma</span>
                  <span>{(selectedPlan ? selectedPlan.price : total).toFixed(2)} €</span>
                </div>
                {form.delivery === "express" && !selectedPlan && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Kiirtarne</span>
                    <span>5.99 €</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Standardtarne</span>
                  <span className="text-green-400">Tasuta</span>
                </div>
                <div className="flex justify-between font-black text-lg border-t border-[#2a2a2a] pt-3">
                  <span>Kokku</span>
                  <span className="text-[#E8195A]">{orderTotal.toFixed(2)} €</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-gray-500 bg-[#1a1a1a] rounded-lg p-3">
                <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Turvaliselt töödeldud Stripe abil. Kaardi andmeid ei salvestata.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KassasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-400">Laadimine...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

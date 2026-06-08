"use client";

import { useState, Suspense } from "react";
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
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", zip: "",
    delivery: "standard",
    cardNumber: "", expiry: "", cvv: "", cardName: "",
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
      <div className="min-h-screen bg-[#FFF0F5] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-[#E8195A] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1
            className="text-4xl text-gray-900 mb-4"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            Tellimus edastatud!
          </h1>
          <p className="text-gray-500 mb-2 text-sm">Aitäh, {form.firstName}!</p>
          <p className="text-gray-500 mb-8 text-sm">
            Kinnituskiri saadetud aadressile <span className="text-gray-900 font-medium">{form.email}</span>.
          </p>
          <a href="/" className="inline-flex items-center justify-center bg-[#E8195A] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#c9144a] transition-colors text-sm">
            Tagasi avalehele
          </a>
        </div>
      </div>
    );
  }

  const inputClass = "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:border-[#E8195A] focus:outline-none placeholder:text-gray-300";
  const labelClass = "text-xs text-gray-500 mb-1.5 block font-medium tracking-wide";

  return (
    <div className="min-h-screen bg-[#FFF0F5] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#E8195A] uppercase mb-2">Turvaline makse</p>
          <h1 className="text-4xl text-gray-900" style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}>
            Vormista tellimus
          </h1>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-10">
          {[{ n: 1, label: "Andmed" }, { n: 2, label: "Tarne" }, { n: 3, label: "Makse" }].map(({ n, label }) => (
            <div key={n} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step === n ? "bg-[#E8195A] text-white" : step > n ? "bg-green-500 text-white" : "bg-white border border-gray-200 text-gray-400"}`}>
                {step > n ? "✓" : n}
              </div>
              <span className={`text-xs font-medium ${step === n ? "text-gray-900" : "text-gray-400"}`}>{label}</span>
              {n < 3 && <div className={`w-10 h-px ${step > n ? "bg-[#E8195A]" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Isikuandmed</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className={labelClass}>Eesnimi *</label><input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="Mari" className={inputClass} /></div>
                    <div><label className={labelClass}>Perekonnanimi *</label><input name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Tamm" className={inputClass} /></div>
                    <div><label className={labelClass}>E-post *</label><input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="mari@gmail.com" className={inputClass} /></div>
                    <div><label className={labelClass}>Telefon *</label><input name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="+372 5555 1234" className={inputClass} /></div>
                    <div className="sm:col-span-2"><label className={labelClass}>Tänav ja majanumber *</label><input name="address" value={form.address} onChange={handleChange} required placeholder="Tartu mnt 12" className={inputClass} /></div>
                    <div><label className={labelClass}>Linn *</label><input name="city" value={form.city} onChange={handleChange} required placeholder="Tallinn" className={inputClass} /></div>
                    <div><label className={labelClass}>Postiindeks *</label><input name="zip" value={form.zip} onChange={handleChange} required placeholder="10116" className={inputClass} /></div>
                  </div>
                  <button type="button" onClick={() => setStep(2)} className="mt-6 w-full bg-[#E8195A] text-white py-3.5 rounded-full font-semibold text-sm hover:bg-[#c9144a] transition-colors">
                    Jätka tarne juurde
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Tarneviis</h2>
                  <div className="space-y-3">
                    {[
                      { value: "standard", label: "Standardtarne", desc: "2–3 tööpäeva", price: "Tasuta" },
                      { value: "express", label: "Kiirtarne", desc: "Järgmine tööpäev", price: "+5.99 €" },
                    ].map((opt) => (
                      <label key={opt.value} className={`flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all ${form.delivery === opt.value ? "border-[#E8195A] bg-[#FFF0F5]" : "border-gray-100 hover:border-gray-200"}`}>
                        <div className="flex items-center gap-4">
                          <input type="radio" name="delivery" value={opt.value} checked={form.delivery === opt.value} onChange={handleChange} className="accent-[#E8195A]" />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">{opt.label}</div>
                            <div className="text-xs text-gray-400">{opt.desc}</div>
                          </div>
                        </div>
                        <span className={`text-sm font-semibold ${opt.value === "standard" ? "text-green-600" : "text-gray-900"}`}>{opt.price}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-gray-600 py-3.5 rounded-full font-semibold text-sm hover:border-gray-300 transition-colors">
                      Tagasi
                    </button>
                    <button type="button" onClick={() => setStep(3)} className="flex-1 bg-[#E8195A] text-white py-3.5 rounded-full font-semibold text-sm hover:bg-[#c9144a] transition-colors">
                      Jätka makse juurde
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Makseandmed</h2>
                  <p className="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    256-bit SSL krüpteeritud Stripe abil
                  </p>
                  <div className="space-y-4">
                    <div><label className={labelClass}>Kaardi omaniku nimi</label><input name="cardName" value={form.cardName} onChange={handleChange} required placeholder="Mari Tamm" className={inputClass} /></div>
                    <div><label className={labelClass}>Kaardi number</label><input name="cardNumber" value={form.cardNumber} onChange={handleChange} required placeholder="4242 4242 4242 4242" maxLength={19} className={`${inputClass} font-mono`} /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className={labelClass}>Kehtivusaeg</label><input name="expiry" value={form.expiry} onChange={handleChange} required placeholder="MM/AA" maxLength={5} className={`${inputClass} font-mono`} /></div>
                      <div><label className={labelClass}>CVV</label><input name="cvv" value={form.cvv} onChange={handleChange} required placeholder="123" maxLength={4} className={`${inputClass} font-mono`} /></div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button type="button" onClick={() => setStep(2)} className="flex-1 border border-gray-200 text-gray-600 py-3.5 rounded-full font-semibold text-sm hover:border-gray-300 transition-colors">
                      Tagasi
                    </button>
                    <button type="submit" disabled={loading} className="flex-1 bg-[#E8195A] text-white py-3.5 rounded-full font-semibold text-sm hover:bg-[#c9144a] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                      {loading ? (
                        <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Töötleme...</>
                      ) : `Maksa ${orderTotal.toFixed(2)} €`}
                    </button>
                  </div>
                  <div className="mt-5 flex items-center justify-center gap-3">
                    {["Visa", "MC", "Amex", "PayPal"].map((card) => (
                      <div key={card} className="bg-gray-50 border border-gray-100 rounded px-2.5 py-1 text-xs text-gray-400">{card}</div>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-6 text-sm">Tellimuse kokkuvõte</h3>

              {selectedPlan ? (
                <div className="flex gap-3 mb-6 bg-[#FFF0F5] rounded-xl p-4">
                  <img src={selectedPlan.image} alt={selectedPlan.name} className="w-14 h-14 object-cover rounded-lg" />
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{selectedPlan.name} plaan</p>
                    <p className="text-xs text-gray-400">Kuutellimine</p>
                    <p className="text-[#E8195A] font-bold text-sm mt-0.5">{selectedPlan.price} €/kuu</p>
                  </div>
                </div>
              ) : items.length > 0 ? (
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 bg-[#FFF0F5] rounded-xl p-3">
                      <img src={item.image} alt={item.name} className="w-11 h-11 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-400">×{item.quantity}</p>
                      </div>
                      <p className="text-xs text-[#E8195A] font-bold">{(item.price * item.quantity).toFixed(2)} €</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm mb-6">Ostukorv on tühi</p>
              )}

              <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Vahesumma</span>
                  <span>{(selectedPlan ? selectedPlan.price : total).toFixed(2)} €</span>
                </div>
                {form.delivery === "express" && !selectedPlan && (
                  <div className="flex justify-between text-gray-500">
                    <span>Kiirtarne</span>
                    <span>5.99 €</span>
                  </div>
                )}
                <div className="flex justify-between text-green-600">
                  <span>Standardtarne</span>
                  <span>Tasuta</span>
                </div>
                <div className="flex justify-between font-bold text-base border-t border-gray-100 pt-3 mt-1">
                  <span className="text-gray-900">Kokku</span>
                  <span className="text-[#E8195A]">{orderTotal.toFixed(2)} €</span>
                </div>
              </div>

              <p className="mt-5 text-xs text-gray-400 text-center">
                Turvaliselt töödeldud Stripe abil
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KassasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFF0F5] flex items-center justify-center text-gray-400 text-sm">Laadimine...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

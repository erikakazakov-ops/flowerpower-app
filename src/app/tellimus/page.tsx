import Link from "next/link";
import { subscriptionPlans } from "@/lib/data";

export default function TellimusPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-[#0d0d0d] py-16 border-b border-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-black mb-4">
            Tellimis<span className="text-[#E8195A]">plaanid</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Vali endale parim plaan. Katkesta igal ajal, ilma penaltita.
          </p>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-[#141414] border rounded-2xl overflow-hidden flex flex-col transition-all hover:scale-102 ${
                plan.popular
                  ? "border-[#E8195A] shadow-[0_0_60px_rgba(232,25,90,0.25)]"
                  : "border-[#2a2a2a] hover:border-[#E8195A]"
              }`}
            >
              {plan.popular && (
                <div className="bg-[#E8195A] text-white text-xs font-black text-center py-2.5 tracking-widest uppercase">
                  ✦ Populaarseim valik ✦
                </div>
              )}

              <div className="relative overflow-hidden">
                <img src={plan.image} alt={plan.name} className="w-full h-52 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="mb-6">
                  <h2 className="text-3xl font-black mb-2">{plan.name}</h2>
                  <p className="text-gray-400">{plan.description}</p>
                </div>

                <div className="flex items-end gap-2 mb-8">
                  <span className="text-5xl font-black text-[#E8195A]">{plan.price}€</span>
                  <span className="text-gray-500 pb-2">/{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className="text-[#E8195A] font-black mt-0.5">✓</span>
                      <span className="text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/kassas?plan=${plan.id}`}
                  className={`block w-full text-center py-4 rounded-full font-black text-lg transition-all ${
                    plan.popular
                      ? "bg-[#E8195A] text-white hover:bg-[#c9144a]"
                      : "border-2 border-[#E8195A] text-[#E8195A] hover:bg-[#E8195A] hover:text-white"
                  }`}
                >
                  Vali {plan.name}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-10">
            Korduma kippuvad <span className="text-[#E8195A]">küsimused</span>
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Millal toimub kohaletoimetamine?",
                a: "Toimetame lilled kohale esmaspäevast reedeni kl 9–18. Saad valida eelistatud päeva tellimuse vormistamisel.",
              },
              {
                q: "Kas saan tellimuse tühistada igal ajal?",
                a: "Jah! Sa saad oma tellimuse tühistada, peatada või vaheta plaani igal ajal oma kontolt. Minimaalne perioodi ei ole.",
              },
              {
                q: "Millised piirkonnad on kaetud?",
                a: "Praegu toimetame lilli üle kogu Tallinna tasuta. Tartu ja Pärnu elanike jaoks on mõningane lisatasu.",
              },
              {
                q: "Mis juhtub, kui lilled ei ole rahuldavad?",
                a: "Kui lilled ei vasta ootustele, võtke meiega kohe ühendust. Tagastame raha või asendame kohe.",
              },
            ].map((faq) => (
              <details key={faq.q} className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6 group cursor-pointer">
                <summary className="flex items-center justify-between font-bold text-white list-none">
                  {faq.q}
                  <svg className="w-5 h-5 text-[#E8195A] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-400 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: "🌿", title: "100% Värsked", desc: "Päevased lilled aiast" },
            { icon: "🚚", title: "Tasuta tarne", desc: "Kõigile tellijatele" },
            { icon: "💳", title: "Turvaline makse", desc: "Stripe kaitsega" },
            { icon: "🔄", title: "Paindlik", desc: "Tühista igal ajal" },
          ].map((b) => (
            <div key={b.title} className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6">
              <div className="text-4xl mb-3">{b.icon}</div>
              <div className="font-bold mb-1">{b.title}</div>
              <div className="text-gray-500 text-sm">{b.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

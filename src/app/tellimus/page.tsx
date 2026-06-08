import Link from "next/link";
import { subscriptionPlans } from "@/lib/data";

export default function TellimusPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header — pink */}
      <div className="bg-[#E8195A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-[0.25em] text-white/60 uppercase mb-4">Paindlikud plaanid</p>
          <h1
            className="text-5xl sm:text-6xl text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            Tellimisplaanid
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Katkesta igal ajal, ilma penaltita.
          </p>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white border rounded-2xl overflow-hidden flex flex-col shadow-sm transition-all hover:-translate-y-1 ${
                plan.popular
                  ? "border-[#E8195A] shadow-[0_8px_40px_rgba(232,25,90,0.15)]"
                  : "border-gray-100 hover:shadow-md"
              }`}
            >
              {plan.popular && (
                <div className="bg-[#E8195A] text-white text-xs font-semibold text-center py-2.5 tracking-widest uppercase">
                  Populaarseim valik
                </div>
              )}
              <div className="relative overflow-hidden">
                <img src={plan.image} alt={plan.name} className="w-full h-52 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h2
                  className="text-3xl text-gray-900 mb-2"
                  style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
                >
                  {plan.name}
                </h2>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                <div className="flex items-end gap-1 mb-8">
                  <span className="text-5xl font-bold text-[#E8195A]">{plan.price}€</span>
                  <span className="text-gray-400 pb-1.5 text-sm">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-[#E8195A] font-bold mt-0.5">+</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/kassas?plan=${plan.id}`}
                  className={`block w-full text-center py-3.5 rounded-full font-semibold text-sm transition-all ${
                    plan.popular
                      ? "bg-[#E8195A] text-white hover:bg-[#c9144a]"
                      : "border border-[#E8195A] text-[#E8195A] hover:bg-[#E8195A] hover:text-white"
                  }`}
                >
                  Vali {plan.name}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ — lilac block */}
        <div className="bg-[#EDE0FF] rounded-3xl p-10 mb-16">
          <h2
            className="text-3xl text-gray-900 text-center mb-10"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            Korduma kippuvad küsimused
          </h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {[
              { q: "Millal toimub kohaletoimetamine?", a: "Toimetame lilled kohale esmaspäevast reedeni kl 9–18. Saad valida eelistatud päeva tellimuse vormistamisel." },
              { q: "Kas saan tellimuse tühistada igal ajal?", a: "Jah! Sa saad oma tellimuse tühistada, peatada või vahetada plaani igal ajal oma kontolt. Minimaalset perioodi ei ole." },
              { q: "Millised piirkonnad on kaetud?", a: "Praegu toimetame lilli üle kogu Tallinna tasuta. Tartu ja Pärnu elanike jaoks on mõningane lisatasu." },
              { q: "Mis juhtub, kui lilled ei ole rahuldavad?", a: "Kui lilled ei vasta ootustele, võtke meiega kohe ühendust. Tagastame raha või asendame kohe." },
            ].map((faq) => (
              <details key={faq.q} className="bg-white rounded-xl p-5 group cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-gray-900 list-none text-sm">
                  {faq.q}
                  <svg className="w-4 h-4 text-[#E8195A] group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { title: "100% Värsked", desc: "Päevased lilled aiast" },
            { title: "Tasuta tarne", desc: "Kõigile tellijatele" },
            { title: "Turvaline makse", desc: "Stripe kaitsega" },
            { title: "Paindlik", desc: "Tühista igal ajal" },
          ].map((b) => (
            <div key={b.title} className="bg-[#FFF0F5] rounded-2xl p-6 text-center">
              <div className="font-semibold text-gray-900 text-sm mb-1">{b.title}</div>
              <div className="text-gray-400 text-xs">{b.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

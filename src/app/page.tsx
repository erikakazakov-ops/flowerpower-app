import Link from "next/link";
import { subscriptionPlans, products } from "@/lib/data";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1490750967868-88df5691cc4b?w=1200&q=85&auto=format&fit=crop"
            alt="Lilled"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#E8195A]/20 border border-[#E8195A]/40 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-[#E8195A] rounded-full animate-pulse" />
              <span className="text-[#E8195A] text-sm font-medium">Tasuta kohaletoimetamine Tallinnas</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-black leading-tight mb-6">
              Värsked lilled<br />
              <span className="text-[#E8195A]">iga nädal</span><br />
              su uksele
            </h1>

            <p className="text-lg text-gray-300 mb-10 leading-relaxed">
              Tellimisena kohaletoimetatud hooajalised lilled otse lillemüüjalt.
              Vali oma plaan ja naudi ilu kodus.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tellimus"
                className="inline-flex items-center justify-center bg-[#E8195A] text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-[#c9144a] transition-all hover:scale-105"
              >
                Alusta tellimust
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/kataloog"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-bold hover:border-[#E8195A] hover:text-[#E8195A] transition-all"
              >
                Vaata kataloogi
              </Link>
            </div>

            <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
              {[
                { num: "2000+", label: "Õnnelikku klienti" },
                { num: "50+", label: "Liigivarikust" },
                { num: "4.9★", label: "Hinnang" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-black text-[#E8195A]">{stat.num}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              Kuidas see <span className="text-[#E8195A]">toimib?</span>
            </h2>
            <p className="text-gray-400 text-lg">Kolm lihtsat sammu kaunite lillede saamiseks</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Vali plaan", desc: "Vali endale sobiv tellimisplaan – Alus, Premium või Luksus.", icon: "🌺" },
              { step: "02", title: "Me valmistame", desc: "Meie lillenõustajad valivad hoolikalt värskeimad lilled sinu kimpudeks.", icon: "💐" },
              { step: "03", title: "Kohaletoimetamine", desc: "Värsked lilled toimetame sinu uksele õigel ajal, igas ilmas.", icon: "🚚" },
            ].map((step) => (
              <div key={step.step} className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-8 hover:border-[#E8195A] transition-all group">
                <div className="text-5xl font-black text-[#E8195A]/20 group-hover:text-[#E8195A]/40 transition-colors mb-4">{step.step}</div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription plans */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              Tellimis<span className="text-[#E8195A]">plaanid</span>
            </h2>
            <p className="text-gray-400 text-lg">Katkesta või vaheta igal ajal – ilma lisakuludeta</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-[#141414] border rounded-2xl overflow-hidden transition-all hover:scale-105 ${
                  plan.popular ? "border-[#E8195A] shadow-[0_0_40px_rgba(232,25,90,0.2)]" : "border-[#2a2a2a] hover:border-[#E8195A]"
                }`}
              >
                {plan.popular && (
                  <div className="bg-[#E8195A] text-white text-xs font-bold text-center py-2 tracking-wider uppercase">
                    Populaarseim valik
                  </div>
                )}
                <img src={plan.image} alt={plan.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-black mb-1">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black text-[#E8195A]">{plan.price}€</span>
                    <span className="text-gray-500">/{plan.period}</span>
                  </div>
                  <ul className="space-y-2 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm text-gray-300">
                        <span className="text-[#E8195A] font-bold">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/kassas?plan=${plan.id}`}
                    className={`block w-full text-center py-3 rounded-full font-bold transition-all ${
                      plan.popular
                        ? "bg-[#E8195A] text-white hover:bg-[#c9144a]"
                        : "border-2 border-[#E8195A] text-[#E8195A] hover:bg-[#E8195A] hover:text-white"
                    }`}
                  >
                    Vali plaan
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black mb-2">Populaarsed <span className="text-[#E8195A]">tooted</span></h2>
              <p className="text-gray-400">Meie klientide lemmikud</p>
            </div>
            <Link href="/kataloog" className="hidden sm:inline-flex items-center gap-2 text-[#E8195A] hover:gap-3 transition-all font-semibold">
              Vaata kõiki
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="bg-[#141414] border border-[#2a2a2a] rounded-2xl overflow-hidden hover:border-[#E8195A] hover:-translate-y-2 transition-all group">
                <div className="relative overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">Otsas</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-[#0a0a0a]/80 text-xs text-gray-300 px-3 py-1 rounded-full">{product.category}</div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-xs mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black text-[#E8195A]">{product.price.toFixed(2)} €</span>
                    <Link href="/kataloog" className="bg-[#E8195A] text-white text-xs px-4 py-2 rounded-full font-semibold hover:bg-[#c9144a] transition-colors">
                      Vaata
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Mida kliendid <span className="text-[#E8195A]">ütlevad?</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Mari T.", text: "Absoluutselt armastan FlowerPoweri! Iga nädal saan värsked lilled ja olen väga rahul teenuse kvaliteediga.", rating: 5, plan: "Premium", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face" },
              { name: "Jaan K.", text: "Luksusplaan on parim asi, mida olen kunagi tellinud. Lilled on alati värsked ja ilusad!", rating: 5, plan: "Luksus", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" },
              { name: "Liisa M.", text: "Väga mugav teenus! Alati täpne kohaletoimetamine ja lilled on täpselt sellised, nagu lubati.", rating: 5, plan: "Alus", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face" },
            ].map((t) => (
              <div key={t.name} className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-6 hover:border-[#E8195A] transition-all">
                <div className="flex gap-1 mb-4">{Array(t.rating).fill(0).map((_, i) => <span key={i} className="text-[#E8195A]">★</span>)}</div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-[#E8195A]">{t.plan} tellija</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#E8195A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1490750967868-88df5691cc30?w=1600&h=400&fit=crop&auto=format" alt="bg" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-6">Alusta täna,<br />naerata homme</h2>
          <p className="text-white/80 text-lg mb-10">Liitu tuhande rahuloleva kliendiga ja lase lilledel rõõmustada!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tellimus" className="inline-flex items-center justify-center bg-white text-[#E8195A] px-8 py-4 rounded-full text-lg font-black hover:bg-gray-100 transition-all hover:scale-105">
              Alusta tellimust
            </Link>
            <Link href="/kataloog" className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/10 transition-all">
              Vaata kataloogi
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

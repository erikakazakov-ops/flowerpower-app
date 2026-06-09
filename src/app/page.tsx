import Link from "next/link";
import { subscriptionPlans } from "@/lib/data";
import { getProducts } from "@/lib/supabase";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      {/* Hero — editorial split */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[92vh]">
        <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-20 bg-white">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#E8195A] uppercase mb-6">
            Lillede tellimine — Tallinn
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl leading-tight text-gray-900 mb-8"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            värsked lilled,<br />
            <span className="text-[#E8195A]">iga nädal</span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md">
            Hooajalised lilled otse sinu ukse taha. Vali plaan, meie muretseme ülejäänu.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/tellimus"
              className="inline-flex items-center justify-center bg-[#E8195A] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#c9144a] transition-colors text-sm"
            >
              Alusta tellimust
            </Link>
            <Link
              href="/kataloog"
              className="inline-flex items-center justify-center border border-gray-200 text-gray-700 px-8 py-3.5 rounded-full font-semibold hover:border-[#E8195A] hover:text-[#E8195A] transition-colors text-sm"
            >
              Vaata kataloogi
            </Link>
          </div>
          <div className="flex gap-10 mt-14 pt-10 border-t border-gray-100">
            {[
              { num: "2000+", label: "Klienti" },
              { num: "50+", label: "Lillaliiki" },
              { num: "4.9", label: "Hinnang" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: "var(--font-playfair)" }}>{s.num}</div>
                <div className="text-xs text-gray-400 tracking-wide uppercase mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative hidden md:block bg-[#FFF0F5]">
          <img
            src="/images/hero.jpg"
            alt="Värsked lilled"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* How it works — lilac block */}
      <section className="py-24 bg-[#EDE0FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl sm:text-5xl text-gray-900 mb-4"
              style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
            >
              Kuidas see toimib?
            </h2>
            <p className="text-gray-500">Kolm lihtsat sammu kaunite lillede saamiseks</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Vali plaan", desc: "Vali endale sobiv tellimisplaan — Alus, Premium või Luksus." },
              { step: "02", title: "Me valmistame", desc: "Meie lillenõustajad valivad hoolikalt värskeimad lilled sinu kimpudeks." },
              { step: "03", title: "Kohaletoimetamine", desc: "Värsked lilled toimetame sinu uksele õigel ajal, igas ilmas." },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-8">
                <div
                  className="text-6xl font-bold text-[#E8195A]/20 mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {s.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription plans — white */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl sm:text-5xl text-gray-900 mb-4"
              style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
            >
              Tellimisplaanid
            </h2>
            <p className="text-gray-500">Katkesta või vaheta igal ajal — ilma lisakuludeta</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white border rounded-2xl overflow-hidden flex flex-col transition-all hover:-translate-y-1 ${
                  plan.popular
                    ? "border-[#E8195A] shadow-[0_8px_40px_rgba(232,25,90,0.15)]"
                    : "border-gray-100 shadow-sm hover:shadow-md"
                }`}
              >
                {plan.popular && (
                  <div className="bg-[#E8195A] text-white text-xs font-semibold text-center py-2 tracking-widest uppercase">
                    Populaarseim
                  </div>
                )}
                <img src={plan.image} alt={plan.name} className="w-full h-48 object-cover" />
                <div className="p-7 flex flex-col flex-1">
                  <h3
                    className="text-2xl text-gray-900 mb-1"
                    style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-5">{plan.description}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold text-[#E8195A]">{plan.price}€</span>
                    <span className="text-gray-400 text-sm">/{plan.period}</span>
                  </div>
                  <ul className="space-y-2 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-[#E8195A] font-bold mt-0.5">+</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/kassas?plan=${plan.id}`}
                    className={`block w-full text-center py-3 rounded-full font-semibold text-sm transition-all ${
                      plan.popular
                        ? "bg-[#E8195A] text-white hover:bg-[#c9144a]"
                        : "border border-[#E8195A] text-[#E8195A] hover:bg-[#E8195A] hover:text-white"
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

      {/* Featured products — blush pink */}
      <section className="py-24 bg-[#FFF0F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2
                className="text-4xl sm:text-5xl text-gray-900 mb-2"
                style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
              >
                Populaarsed tooted
              </h2>
              <p className="text-gray-400 text-sm">Meie klientide lemmikud</p>
            </div>
            <Link href="/kataloog" className="text-[#E8195A] text-sm font-semibold hover:underline hidden sm:block">
              Vaata kõiki →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {!product.in_stock && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                      <span className="text-gray-500 font-medium text-sm">Otsas</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-white text-xs text-gray-500 px-3 py-1 rounded-full shadow-sm">
                    {product.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-gray-400 text-xs mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-[#E8195A]">{product.price.toFixed(2)} €</span>
                    <Link
                      href="/kataloog"
                      className="bg-[#E8195A] text-white text-xs px-4 py-2 rounded-full font-semibold hover:bg-[#c9144a] transition-colors"
                    >
                      Vaata
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — bold pink block */}
      <section className="py-24 bg-[#E8195A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2
              className="text-4xl sm:text-5xl text-white mb-3"
              style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
            >
              Mida kliendid ütlevad?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Mari T.", text: "Absoluutselt armastan FlowerPoweri! Iga nädal saan värsked lilled ja olen väga rahul teenuse kvaliteediga.", plan: "Premium tellija", avatar: "/images/about.jpg" },
              { name: "Jaan K.", text: "Luksusplaan on parim asi, mida olen kunagi tellinud. Lilled on alati värsked ja ilusad!", plan: "Luksus tellija", avatar: "/images/store.jpg" },
              { name: "Liisa M.", text: "Väga mugav teenus! Alati täpne kohaletoimetamine ja lilled on täpselt sellised, nagu lubati.", plan: "Alus tellija", avatar: "/images/events.jpg" },
            ].map((t) => (
              <div key={t.name} className="bg-white/10 backdrop-blur rounded-2xl p-7">
                <div className="flex gap-0.5 mb-5">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-white" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-white/90 text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-white/60 text-xs">{t.plan}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — lilac block */}
      <section className="py-24 bg-[#EDE0FF]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-5xl sm:text-6xl text-gray-900 mb-6"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
          >
            Alusta täna,<br />naerata homme
          </h2>
          <p className="text-gray-500 text-lg mb-10">
            Liitu tuhande rahuloleva kliendiga ja lase lilledel rõõmustada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tellimus"
              className="inline-flex items-center justify-center bg-[#E8195A] text-white px-10 py-4 rounded-full text-base font-semibold hover:bg-[#c9144a] transition-all hover:scale-105"
            >
              Alusta tellimust
            </Link>
            <Link
              href="/kataloog"
              className="inline-flex items-center justify-center bg-white border border-gray-200 text-gray-700 px-10 py-4 rounded-full text-base font-semibold hover:border-[#E8195A] hover:text-[#E8195A] transition-all"
            >
              Vaata kataloogi
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

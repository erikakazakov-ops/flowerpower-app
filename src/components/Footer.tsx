import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#FFF0F5] border-t border-pink-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <span
              className="text-3xl text-[#E8195A] block mb-4"
              style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
            >
              flowerpower
            </span>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Toome elu ja värvi sinu koju. Värsked lilled otse sinuni,
              iga nädal või iga kuu — sina valid, meie muretseme.
            </p>
            <div className="flex gap-3 mt-6">
              {["IG", "FB", "TT"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 bg-white border border-pink-200 rounded-full flex items-center justify-center text-xs font-bold text-[#E8195A] hover:bg-[#E8195A] hover:text-white hover:border-[#E8195A] transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm tracking-widest uppercase">Navigatsioon</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-[#E8195A] transition-colors">Avaleht</Link></li>
              <li><Link href="/kataloog" className="hover:text-[#E8195A] transition-colors">Kataloog</Link></li>
              <li><Link href="/tellimus" className="hover:text-[#E8195A] transition-colors">Tellimisplaanid</Link></li>
              <li><Link href="/kassas" className="hover:text-[#E8195A] transition-colors">Osta nüüd</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm tracking-widest uppercase">Kontakt</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Tartu mnt 18, Tallinn</li>
              <li>+372 5555 1234</li>
              <li>info@flowerpower.ee</li>
              <li className="pt-2 text-xs text-gray-400">E–R: 9:00 – 18:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-pink-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© 2026 FlowerPower. Kõik õigused kaitstud.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-600 transition-colors">Privaatsuspoliitika</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Kasutustingimused</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-[#1f1f1f] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌸</span>
              <span className="text-2xl font-black text-white">
                Flower<span className="text-[#E8195A]">Power</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Toome elu ja värvi sinu koju. Värsked lilled otse sinuni,
              iga nädal või iga kuu – sina valid, meie muretseme.
            </p>
            <div className="flex gap-4 mt-6">
              {["instagram", "facebook", "tiktok"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 bg-[#1f1f1f] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#E8195A] hover:text-white transition-all"
                >
                  <span className="text-xs font-bold capitalize">{s[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Navigatsioon</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-[#E8195A] transition-colors">Avaleht</Link></li>
              <li><Link href="/kataloog" className="hover:text-[#E8195A] transition-colors">Kataloog</Link></li>
              <li><Link href="/tellimus" className="hover:text-[#E8195A] transition-colors">Tellimisplaanid</Link></li>
              <li><Link href="/kassas" className="hover:text-[#E8195A] transition-colors">Osta nüüd</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Kontakt</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 Tartu mnt 18, Tallinn</li>
              <li>📞 +372 5555 1234</li>
              <li>✉️ info@flowerpower.ee</li>
              <li className="mt-4">
                <span className="text-xs text-gray-600">E–R: 9:00 – 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1f1f1f] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>© 2026 FlowerPower. Kõik õigused kaitstud.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Privaatsuspoliitika</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Kasutustingimused</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

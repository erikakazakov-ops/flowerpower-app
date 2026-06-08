"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { count } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-[#1f1f1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black text-[#E8195A]">🌸</span>
              <span className="text-xl font-black text-white">
                Flower<span className="text-[#E8195A]">Power</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-300 hover:text-[#E8195A] transition-colors text-sm font-medium">
                Avaleht
              </Link>
              <Link href="/kataloog" className="text-gray-300 hover:text-[#E8195A] transition-colors text-sm font-medium">
                Kataloog
              </Link>
              <Link href="/tellimus" className="text-gray-300 hover:text-[#E8195A] transition-colors text-sm font-medium">
                Tellimused
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-gray-300 hover:text-[#E8195A] transition-colors"
                aria-label="Ostukorv"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#E8195A] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {count}
                  </span>
                )}
              </button>

              <Link
                href="/kassas"
                className="hidden md:inline-flex items-center bg-[#E8195A] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#c9144a] transition-colors"
              >
                Telli nüüd
              </Link>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden py-4 border-t border-[#1f1f1f] flex flex-col gap-4">
              <Link href="/" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-[#E8195A] transition-colors">Avaleht</Link>
              <Link href="/kataloog" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-[#E8195A] transition-colors">Kataloog</Link>
              <Link href="/tellimus" onClick={() => setMenuOpen(false)} className="text-gray-300 hover:text-[#E8195A] transition-colors">Tellimused</Link>
              <Link href="/kassas" onClick={() => setMenuOpen(false)} className="bg-[#E8195A] text-white px-5 py-2 rounded-full text-sm font-semibold text-center hover:bg-[#c9144a] transition-colors">Telli nüüd</Link>
            </div>
          )}
        </div>
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

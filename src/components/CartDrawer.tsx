"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { items, removeItem, total } = useCart();

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm" onClick={onClose} />}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 flex flex-col transition-transform duration-300 shadow-2xl ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900" style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}>Ostukorv</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-sm">Ostukorv on tühi</p>
              <Link href="/kataloog" onClick={onClose} className="text-[#E8195A] hover:underline mt-2 inline-block text-sm">
                Vaata kataloogi
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-[#FFF0F5] rounded-xl p-3">
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">{item.name}</p>
                    <p className="text-[#E8195A] font-bold text-sm mt-0.5">{(item.price * item.quantity).toFixed(2)} €</p>
                    <p className="text-gray-400 text-xs">Kogus: {item.quantity}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-[#E8195A] transition-colors self-start mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100">
            <div className="flex justify-between mb-4">
              <span className="text-gray-500 text-sm">Kokku:</span>
              <span className="text-xl font-bold text-[#E8195A]">{total.toFixed(2)} €</span>
            </div>
            <Link
              href="/kassas"
              onClick={onClose}
              className="block w-full text-center bg-[#E8195A] text-white py-3 rounded-full font-semibold hover:bg-[#c9144a] transition-colors text-sm"
            >
              Vormista tellimus
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

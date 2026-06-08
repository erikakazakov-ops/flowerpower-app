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
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-sm bg-[#111] z-50 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#222]">
          <h2 className="text-xl font-bold">Ostukorv</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p>Ostukorv on tühi</p>
              <Link href="/kataloog" onClick={onClose} className="text-[#E8195A] hover:underline mt-2 inline-block">
                Vaata kataloogi
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-[#1a1a1a] rounded-xl p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-[#E8195A] font-bold text-sm mt-1">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                    <p className="text-gray-500 text-xs">Kogus: {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-500 hover:text-red-500 transition-colors self-start"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-[#222]">
            <div className="flex justify-between mb-4">
              <span className="text-gray-400">Kokku:</span>
              <span className="text-xl font-bold text-[#E8195A]">{total.toFixed(2)} €</span>
            </div>
            <Link
              href="/kassas"
              onClick={onClose}
              className="block w-full text-center bg-[#E8195A] text-white py-3 rounded-full font-semibold hover:bg-[#c9144a] transition-colors"
            >
              Vormista tellimus
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

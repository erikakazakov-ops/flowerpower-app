"use client";

import { CartContextProvider } from "@/lib/cart";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  return <CartContextProvider>{children}</CartContextProvider>;
}

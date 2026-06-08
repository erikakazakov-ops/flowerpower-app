import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartProvider from "@/components/CartProvider";

export const metadata: Metadata = {
  title: "FlowerPower – Lillede Tellimine",
  description: "Tillaute lillede tellimisteenus Eestis. Värsked lilled otse su ukse taha.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="et" className="h-full">
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

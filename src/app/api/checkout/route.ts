import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, plan } = body;

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json({ error: "Stripe ei ole konfigureeritud" }, { status: 500 });
    }

    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeKey, { apiVersion: "2026-05-27.dahlia" });

    const lineItems = plan
      ? [
          {
            price_data: {
              currency: "eur",
              product_data: { name: `FlowerPower ${plan.name} plaan`, description: plan.description },
              unit_amount: Math.round(plan.price * 100),
              recurring: { interval: "month" as const },
            },
            quantity: 1,
          },
        ]
      : items.map((item: { name: string; price: number; quantity: number }) => ({
          price_data: {
            currency: "eur",
            product_data: { name: item.name },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: plan ? "subscription" : "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/kassas?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/kassas`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: "Makse loomine ebaõnnestus" }, { status: 500 });
  }
}

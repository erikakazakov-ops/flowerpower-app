import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Täida kõik väljad" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error: dbError } = await supabase
    .from("enquiries")
    .insert({ name, email, message });

  if (dbError) {
    console.error("Supabase insert error:", dbError);
    return NextResponse.json({ error: "Andmete salvestamine ebaõnnestus" }, { status: 500 });
  }

  const { error: emailError } = await resend.emails.send({
    from: "FlowerPower <onboarding@resend.dev>",
    to: email,
    subject: "Täname pöördumast – FlowerPower",
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #fff; padding: 40px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="font-size: 32px; color: #E8195A; font-style: italic;">flowerpower</span>
        </div>

        <p style="font-size: 18px; color: #1a1a1a; margin-bottom: 8px;">Tere, ${name}!</p>

        <p style="font-size: 15px; color: #444; line-height: 1.7; margin-bottom: 20px;">
          Suur tänu, et võtsid meiega ühendust! Oleme sinu sõnumi kätte saanud ja vastame
          sulle <strong>24 tunni jooksul</strong>.
        </p>

        <p style="font-size: 15px; color: #444; line-height: 1.7; margin-bottom: 20px;">
          FlowerPoweris on iga kliendipöördumine meile tähtis – olgu küsimus lillekimbu
          valikust, tarneajast või mõnest erilisest soovist. Meie meeskond on alati valmis
          aitama.
        </p>

        <div style="background: #FFF0F5; border-left: 4px solid #E8195A; padding: 16px 20px; margin: 28px 0; border-radius: 4px;">
          <p style="font-size: 13px; color: #888; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.08em;">Sinu sõnum</p>
          <p style="font-size: 14px; color: #333; margin: 0; font-style: italic; line-height: 1.6;">"${message}"</p>
        </div>

        <p style="font-size: 15px; color: #444; line-height: 1.7; margin-bottom: 28px;">
          Kuni meie vastuseni – soovime sulle kauneid lillemomente! 🌸
        </p>

        <hr style="border: none; border-top: 1px solid #f0d0de; margin: 28px 0;" />

        <div style="text-align: center;">
          <p style="font-size: 13px; color: #aaa; margin: 0;">
            FlowerPower · Tartu mnt 18, Tallinn<br />
            <a href="mailto:info@flowerpower.ee" style="color: #E8195A; text-decoration: none;">info@flowerpower.ee</a>
            &nbsp;·&nbsp; +372 5555 1234
          </p>
        </div>
      </div>
    `,
  });

  if (emailError) {
    console.error("Resend error:", emailError);
    return NextResponse.json({ error: "E-kirja saatmine ebaõnnestus" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

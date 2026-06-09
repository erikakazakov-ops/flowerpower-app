import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

const resend = new Resend(process.env.RESEND_API_KEY);
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT =
  "You are customer service for FlowerPower, a flower shop in Tallinn. Write warm personal responses in Estonian under 150 words. Plans: Põhi €29/kuu, Regulaarne €52/kuu, Iganädalane €89/kuu. Store at Viru 12, open E-L 9-19. Sign off as FlowerPower meeskond.";

function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}

async function generateReply(name: string, message: string): Promise<string> {
  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 512,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Kliendi nimi: ${name}\nKliendi sõnum: ${message}\n\nKirjuta neile vastus e-kirja kehana.`,
      },
    ],
  });

  const block = response.content[0];
  return block.type === "text" ? block.text : "";
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

  let replyBody: string;
  try {
    replyBody = await generateReply(name, message);
  } catch (err) {
    console.error("Claude error:", err);
    replyBody = `Tere, ${name}!\n\nSuur tänu, et võtsid meiega ühendust! Oleme sinu sõnumi kätte saanud ja vastame sulle 24 tunni jooksul.\n\nFlowerPower meeskond`;
  }

  // Convert plain-text reply paragraphs to HTML
  const replyHtml = replyBody
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => `<p style="font-size:15px;color:#444;line-height:1.7;margin:0 0 12px 0;">${line}</p>`)
    .join("");

  const { error: emailError } = await resend.emails.send({
    from: "FlowerPower <onboarding@resend.dev>",
    to: email,
    subject: "Täname pöördumast – FlowerPower",
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #fff; padding: 40px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="font-size: 32px; color: #E8195A; font-style: italic;">flowerpower</span>
        </div>

        ${replyHtml}

        <div style="background: #FFF0F5; border-left: 4px solid #E8195A; padding: 16px 20px; margin: 28px 0; border-radius: 4px;">
          <p style="font-size: 13px; color: #888; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 0.08em;">Sinu sõnum</p>
          <p style="font-size: 14px; color: #333; margin: 0; font-style: italic; line-height: 1.6;">"${message}"</p>
        </div>

        <hr style="border: none; border-top: 1px solid #f0d0de; margin: 28px 0;" />

        <div style="text-align: center;">
          <p style="font-size: 13px; color: #aaa; margin: 0;">
            FlowerPower · Viru 12, Tallinn<br />
            <a href="mailto:info@flowerpower.ee" style="color: #E8195A; text-decoration: none;">info@flowerpower.ee</a>
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

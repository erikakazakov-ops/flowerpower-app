import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';
import { getProducts } from '@/lib/supabase';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}

type SSEEvent = {
  stage: 'agent1' | 'agent2' | 'agent3' | 'done' | 'error';
  message: string;
  result?: string;
};

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return new Response(JSON.stringify({ error: 'Email puudub' }), { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: SSEEvent) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));

      try {
        // ── Agent 1: Profile Analyst ────────────────────────────────────────
        send({ stage: 'agent1', message: 'Analüüsin sinu profiili...' });

        const supabase = createAdminClient();
        const { data: profiles, error: profileError } = await supabase
          .from('customer_profiles')
          .select('*')
          .eq('email', email)
          .order('created_at', { ascending: false })
          .limit(1);

        if (profileError || !profiles?.length) {
          send({ stage: 'error', message: 'Profiili ei leitud.' });
          controller.close();
          return;
        }

        const profile = profiles[0];

        const agent1 = await anthropic.messages.create({
          model: 'claude-haiku-4-5',
          max_tokens: 512,
          system:
            'You are a floral design analyst. Given a customer profile, output a concise JSON brief only — no other text, no markdown fences.',
          messages: [
            {
              role: 'user',
              content: `Profile:\n${JSON.stringify(profile, null, 2)}\n\nOutput JSON with keys: style_keywords (string[]), colour_palette (string[]), mood (string), occasions_summary (string), formality ("low"|"medium"|"high").`,
            },
          ],
        });

        const briefText = agent1.content.find((b) => b.type === 'text')?.text ?? '{}';
        let brief: Record<string, unknown> = {};
        try {
          const m = briefText.match(/\{[\s\S]*\}/);
          if (m) brief = JSON.parse(m[0]);
        } catch {
          brief = { raw: briefText };
        }

        // ── Agent 2: Product Matcher ────────────────────────────────────────
        send({ stage: 'agent2', message: 'Valin sobivaid lilli...' });

        const products = await getProducts();
        const inStock = products
          .filter((p) => p.in_stock)
          .map((p) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            description: p.description,
            price: p.price,
          }));

        const agent2 = await anthropic.messages.create({
          model: 'claude-haiku-4-5',
          max_tokens: 512,
          system:
            'You are a florist. Given a customer brief and available products, output a JSON array only — no other text, no markdown fences.',
          messages: [
            {
              role: 'user',
              content: `Brief:\n${JSON.stringify(brief, null, 2)}\n\nProducts:\n${JSON.stringify(inStock, null, 2)}\n\nOutput: [{"id":"...","name":"...","reason":"..."}] with 2–3 best matches.`,
            },
          ],
        });

        const matchText = agent2.content.find((b) => b.type === 'text')?.text ?? '[]';
        let matched: Array<{ id: string; name: string; reason: string }> = [];
        try {
          const m = matchText.match(/\[[\s\S]*\]/);
          if (m) matched = JSON.parse(m[0]);
        } catch {
          matched = [];
        }

        // ── Agent 3: Message Writer ─────────────────────────────────────────
        send({ stage: 'agent3', message: 'Koostan isiklikku soovitust...' });

        const firstName = profile.name.split(' ')[0];
        const agent3 = await anthropic.messages.create({
          model: 'claude-haiku-4-5',
          max_tokens: 300,
          system:
            'You are a warm Estonian florist writing personalised recommendations. Estonian only. Plain text, no markdown. Under 150 words.',
          messages: [
            {
              role: 'user',
              content: `Write a personalised flower recommendation for ${profile.name} (address them as ${firstName}).
Home style: ${profile.home_style}. Colour preference: ${profile.colour_preference}.
Selected flowers: ${matched.map((p) => `${p.name} (${p.reason})`).join('; ') || 'ilus hooajaline kimp'}.
Be warm and personal, like a trusted local florist. Under 150 words.`,
            },
          ],
        });

        const recommendation =
          agent3.content.find((b) => b.type === 'text')?.text ?? '';

        send({ stage: 'done', message: 'Soovitus on valmis!', result: recommendation });
      } catch (err) {
        console.error('[concierge/recommend]', err);
        send({ stage: 'error', message: 'Midagi läks valesti. Proovi hiljem uuesti.' });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

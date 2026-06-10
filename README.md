import Groq from "groq-sdk";
import { NextRequest } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const MODE_INSTRUCTIONS: Record<string, string> = {
  standard: "natural, everyday writing that sounds like a thoughtful real person",
  academic: "academic writing that sounds like a genuine human scholar — naturally varied, not robotic",
  casual: "friendly, conversational writing — relaxed and warm, like a smart friend explaining something",
  professional: "clear professional writing with natural rhythm, avoiding corporate buzzwords and jargon",
};

const STRENGTH_INSTRUCTIONS: Record<string, string> = {
  light:
    "Make subtle changes: vary sentence rhythm, remove overused AI phrases, add natural transitions. Keep the original structure mostly intact.",
  balanced:
    "Rework the writing meaningfully: change sentence structures, replace robotic phrasing, add natural variation in length and tone. It should feel like a real person wrote it.",
  aggressive:
    "Completely rewrite for maximum human authenticity. Change word order, restructure paragraphs, vary tone and sentence length dramatically. Eliminate ALL detectable AI patterns.",
};

function buildPrompt(text: string, mode: string, strength: string): string {
  return `You are an expert editor who rewrites AI-generated text to sound completely human and authentic.

Task: Rewrite the following text to sound like ${MODE_INSTRUCTIONS[mode] ?? MODE_INSTRUCTIONS.standard}.

Rewriting approach: ${STRENGTH_INSTRUCTIONS[strength] ?? STRENGTH_INSTRUCTIONS.balanced}

Rules:
- NEVER use these overused AI words/phrases: "delve", "realm", "leverage", "robust", "seamless", "utilize", "facilitate", "pivotal", "holistic", "synergy", "paradigm", "comprehensive", "tailored", "in today's world", "it is worth noting", "it is important to note", "furthermore", "moreover"
- Vary sentence length — mix short punchy sentences with longer flowing ones
- Use contractions naturally where they fit
- Avoid starting multiple consecutive sentences the same way
- Don't use bullet points unless the original had them
- Preserve all key information and meaning
- Output ONLY the rewritten text — no explanations, no preamble, no commentary

Text to rewrite:
${text}`;
}

export async function POST(req: NextRequest) {
  try {
    const { text, mode = "standard", strength = "balanced" } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length < 10) {
      return new Response(JSON.stringify({ error: "Please provide at least a sentence of text." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (text.length > 8000) {
      return new Response(JSON.stringify({ error: "Text is too long. Please keep it under 8000 characters." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: buildPrompt(text, mode, strength) }],
      max_tokens: 2048,
      temperature: 0.75,
      stream: true,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const token = chunk.choices[0]?.delta?.content ?? "";
            if (token) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err: unknown) {
    console.error("Humanize API error:", err);
    const message = err instanceof Error ? err.message : "Something went wrong";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

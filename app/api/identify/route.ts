import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return NextResponse.json({ error: "Photo identification needs an OPENAI_API_KEY. You can still enter item details manually." }, { status: 503 });
  try {
    const body = await request.json();
    const image = body?.image;
    if (typeof image !== "string" || !image.startsWith("data:image/") || image.length > 12000000)
      return NextResponse.json({ error: "Please upload a valid image under 9 MB." }, { status: 400 });
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-4.1-mini", input: [{ role: "user", content: [
        { type: "input_text", text: "Identify the visible resale item. Return JSON only with keys name, brand, model, condition (New, Like new, Good, Fair, Parts/repair, Unknown), details (array of short strings), confidence (0-1). Do not guess hidden model numbers or facts; use Unknown when uncertain. Do not estimate price." },
        { type: "input_image", image_url: image, detail: "high" }
      ] }], text: { format: { type: "json_object" } }, max_output_tokens: 350 })
    });
    if (!response.ok) {
      console.error("Identification provider error:", response.status, (await response.text()).slice(0, 400));
      return NextResponse.json({ error: "Identification could not complete. Try again or enter details manually." }, { status: 502 });
    }
    const data = await response.json();
    const output = data.output?.flatMap((item: { content?: Array<{ type?: string; text?: string }> }) => item.content ?? []);
    const raw = output?.find((item: { type?: string }) => item.type === "output_text")?.text;
    if (!raw) return NextResponse.json({ error: "No identification was returned. Try another photo." }, { status: 502 });
    const parsed = JSON.parse(raw);
    return NextResponse.json({
      name: String(parsed.name ?? ""), brand: String(parsed.brand ?? ""), model: String(parsed.model ?? ""),
      condition: String(parsed.condition ?? "Unknown"),
      details: Array.isArray(parsed.details) ? parsed.details.map(String).slice(0, 5) : [],
      confidence: Math.max(0, Math.min(1, Number(parsed.confidence) || 0))
    });
  } catch (error) {
    console.error("Identification route error:", error);
    return NextResponse.json({ error: "Could not read that photo. Please try again." }, { status: 500 });
  }
}
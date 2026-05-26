import { openai } from "./_utils/openai.js";

export default async function handler(req, res) {
  try {
    const body = req.body || {};
    const prompt = body.productText || "produk affiliate";
    const style = body.style || "viral";

    const ai = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Kamu AI marketing TikTok affiliate Indonesia."
        },
        {
          role: "user",
          content: `Buat script TikTok viral:
Produk: ${prompt}
Style: ${style}
Hook kuat + CTA.`
        }
      ]
    });

    const script = ai?.choices?.[0]?.message?.content;

    return res.status(200).json({
      success: true,
      script
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}

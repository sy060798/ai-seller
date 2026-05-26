import { openai } from "./_utils/openai.js";
import randomStyle from "./random-style.js";

export default async function handler(req, res) {
  try {
    const body = req.body || {};

    const style =
      body.style === "random" || !body.style
        ? randomStyle()
        : body.style;

    const prompt = body.prompt || body.productText || "produk affiliate";

    const ai = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Kamu adalah AI marketing affiliate Indonesia yang membuat script TikTok viral."
        },
        {
          role: "user",
          content: `Buat script TikTok affiliate:
Produk: ${prompt}
Style: ${style}
Buat singkat, hook kuat 3 detik pertama, dan CTA kuat.`
        }
      ]
    });

    const script = ai?.choices?.[0]?.message?.content;

    if (!script) {
      return res.status(500).json({
        success: false,
        error: "Script kosong dari AI"
      });
    }

    return res.status(200).json({
      success: true,
      style,
      script
    });

  } catch (error) {
    console.error("SCRIPT ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

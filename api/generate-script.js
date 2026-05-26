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
            "Kamu adalah AI marketing affiliate Indonesia yang membuat script TikTok viral, singkat, dan persuasif."
        },
        {
          role: "user",
          content: `Buat script video affiliate:
Produk: ${prompt}
Style: ${style}
Buat hook kuat 3 detik pertama, singkat, viral, dan ajakan beli yang kuat.`
        }
      ]
    });

    const script = ai?.choices?.[0]?.message?.content;

    if (!script) {
      return res.status(500).json({
        success: false,
        error: "No script generated"
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
      error: error.message || "Generate script failed"
    });
  }
}

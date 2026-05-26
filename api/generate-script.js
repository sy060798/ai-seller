import { openai } from "./_utils/openai.js";
import randomStyle from "./random-style.js";

export default async function handler(req, res) {
  try {
    const body = req.body ? JSON.parse(req.body) : {};

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
Buat singkat, viral, hook kuat di 3 detik pertama, dan ajakan beli.`
        }
      ]
    });

    return res.status(200).json({
      success: true,
      style,
      script: ai.choices[0].message.content
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Generate script failed"
    });
  }
}

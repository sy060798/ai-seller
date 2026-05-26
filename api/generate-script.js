import { openai } from "./_utils/openai.js";
import randomStyle from "./random-style.js";

export default async function handler(req, res) {

  const body = JSON.parse(req.body);

  const style = body.style === "random"
    ? randomStyle()
    : body.style;

  const prompt = body.prompt;

  const ai = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Kamu adalah AI marketing affiliate Indonesia yang membuat script viral TikTok."
      },
      {
        role: "user",
        content: `Buat script video affiliate:
Produk: ${prompt}
Style: ${style}
Buat singkat, viral, dan menarik.`
      }
    ]
  });

  res.status(200).json({
    success: true,
    style,
    script: ai.choices[0].message.content
  });
}

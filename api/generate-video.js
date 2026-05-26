import { openai } from "./_utils/openai.js";

export default async function handler(req, res) {
  try {
    const body = req.body || {};
    const prompt = body.productText || "video produk";
    const style = body.style || "cinematic";

    const ai = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Kamu AI video script TikTok affiliate."
        },
        {
          role: "user",
          content: `Buat script video:
Produk: ${prompt}
Style: ${style}`
        }
      ]
    });

    const script = ai?.choices?.[0]?.message?.content;

    return res.status(200).json({
      success: true,
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      script,
      music: "assets/music/default.mp3"
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}

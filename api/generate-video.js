import { openai } from "./_utils/openai.js";
import musicMatcher from "./music-matcher.js";

export default async function handler(req, res) {
  try {
    const body = req.body || {};

    const prompt = body.prompt || body.productText || "product video";
    const style = body.style || "cinematic";

    // SCRIPT AI
    const scriptAI = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Kamu adalah AI pembuat script video TikTok affiliate."
        },
        {
          role: "user",
          content: `Buat script video TikTok affiliate:
Produk: ${prompt}
Style: ${style}
Buat viral, singkat, dan CTA kuat.`
        }
      ]
    });

    const script = scriptAI?.choices?.[0]?.message?.content;

    if (!script) {
      return res.status(500).json({
        success: false,
        error: "Script video kosong"
      });
    }

    // MUSIC SAFE
    let music;
    try {
      music = musicMatcher(prompt, style);
    } catch (err) {
      console.error("music error:", err);
      music = "assets/music/default.mp3";
    }

    // VIDEO PLACEHOLDER
    const video = "https://www.w3schools.com/html/mov_bbb.mp4";

    return res.status(200).json({
      success: true,
      script,
      music,
      style,
      video
    });

  } catch (error) {
    console.error("VIDEO ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

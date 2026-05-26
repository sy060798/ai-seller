import { openai } from "./_utils/openai.js";
import musicMatcher from "./music-matcher.js";

export default async function handler(req, res) {
  try {
    const body = req.body || {};

    const prompt = body.prompt || body.productText || "product video";
    const style = body.style || "cinematic";

    // ======================
    // STEP 1: SCRIPT AI
    // ======================
    const scriptAI = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Kamu adalah AI pembuat script video marketing TikTok affiliate Indonesia yang viral, singkat, dan engaging."
        },
        {
          role: "user",
          content: `Buat script video TikTok affiliate:
Produk: ${prompt}
Style: ${style}
Buat hook 3 detik pertama sangat kuat, viral, dan ajakan beli yang persuasif.`
        }
      ]
    });

    const script = scriptAI?.choices?.[0]?.message?.content;

    if (!script) {
      return res.status(500).json({
        success: false,
        error: "Script AI kosong"
      });
    }

    // ======================
    // STEP 2: MUSIC MATCHER
    // ======================
    let music = null;

    try {
      music = musicMatcher(prompt, style);
    } catch (err) {
      console.error("Music matcher error:", err);
      music = "assets/music/default.mp3";
    }

    // ======================
    // STEP 3: VIDEO OUTPUT
    // ======================
    const video =
      "https://www.w3schools.com/html/mov_bbb.mp4";

    return res.status(200).json({
      success: true,
      video,
      script,
      music,
      style
    });

  } catch (error) {
    console.error("VIDEO ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Generate video failed"
    });
  }
}

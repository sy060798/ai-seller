import { openai } from "./_utils/openai.js";
import musicMatcher from "./music-matcher.js";

export default async function handler(req, res) {
  try {
    const body = req.body ? JSON.parse(req.body) : {};

    const prompt = body.prompt || body.productText || "product video";
    const style = body.style || "cinematic";

    // STEP 1: SCRIPT AI
    const scriptAI = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Kamu adalah AI pembuat script video marketing TikTok affiliate."
        },
        {
          role: "user",
          content: `Buat script video TikTok affiliate pendek, viral, dan engaging untuk produk: ${prompt}`
        }
      ]
    });

    const script = scriptAI.choices[0].message.content;

    // STEP 2: MUSIC MATCHER
    const music = musicMatcher(prompt, style);

    // STEP 3: VIDEO PLACEHOLDER (bisa upgrade ke Runway/Pika nanti)
    const video = "https://www.w3schools.com/html/mov_bbb.mp4";

    return res.status(200).json({
      success: true,
      video,
      script,
      music,
      style
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Generate video failed"
    });
  }
}

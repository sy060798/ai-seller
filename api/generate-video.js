import { openai } from "./_utils/openai.js";
import musicMatcher from "./music-matcher.js";

export default async function handler(req, res) {

  const body = JSON.parse(req.body);

  const prompt = body.prompt;
  const style = body.style || "cinematic";

  // STEP 1: SCRIPT AI
  const scriptAI = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Buat script video TikTok affiliate pendek untuk: ${prompt}`
      }
    ]
  });

  const script = scriptAI.choices[0].message.content;

  // STEP 2: MUSIC AI
  const music = musicMatcher(prompt, style);

  // STEP 3: VIDEO (placeholder - nanti bisa Runway/Pika API)
  const video = "https://www.w3schools.com/html/mov_bbb.mp4";

  res.status(200).json({
    success: true,
    video,
    script,
    music,
    style
  });
}

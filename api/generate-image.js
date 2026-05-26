import { openai } from "./_utils/openai.js";

export default async function handler(req, res) {
  try {
    const body = req.body || {};
    const prompt = body.productText || "product ad";

    const img = await openai.images.generate({
      model: "gpt-image-1",
      prompt: `cinematic product ad, studio lighting: ${prompt}`,
      size: "1024x1024"
    });

    const url = img?.data?.[0]?.url || img?.data?.[0]?.b64_json;

    return res.status(200).json({
      success: true,
      url
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}

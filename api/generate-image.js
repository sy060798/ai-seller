import { openai } from "./_utils/openai.js";

export default async function handler(req, res) {
  try {
    const body = req.body || {};

    const prompt = body.prompt || body.productText || "product advertisement";

    const image = await openai.images.generate({
      model: "gpt-image-1",
      prompt: `high quality cinematic product advertisement, studio lighting: ${prompt}`,
      size: "1024x1024"
    });

    const result = image?.data?.[0];

    const url = result?.url || result?.b64_json;

    if (!url) {
      return res.status(500).json({
        success: false,
        error: "No image returned from OpenAI"
      });
    }

    return res.status(200).json({
      success: true,
      url
    });

  } catch (error) {
    console.error("IMAGE ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

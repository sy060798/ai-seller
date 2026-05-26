import { openai } from "./_utils/openai.js";

export default async function handler(req, res) {
  try {
    const body = req.body || {};

    const prompt =
      body.prompt ||
      body.productText ||
      "product advertisement";

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: `high quality cinematic product advertisement, ultra realistic, studio lighting: ${prompt}`,
      size: "1024x1024"
    });

    const imageUrl = response?.data?.[0]?.url;

    if (!imageUrl) {
      return res.status(500).json({
        success: false,
        error: "No image returned from AI"
      });
    }

    return res.status(200).json({
      success: true,
      url: imageUrl
    });

  } catch (error) {
    console.error("IMAGE ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Image generation failed"
    });
  }
}

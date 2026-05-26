import { openai } from "./_utils/openai.js";

export default async function handler(req, res) {
  try {
    const body = req.body ? JSON.parse(req.body) : {};
    const prompt = body.prompt || body.productText || "product advertisement";

    const image = await openai.images.generate({
      model: "gpt-image-1",
      prompt: `high quality product advertising poster, cinematic lighting: ${prompt}`,
      size: "1024x1024"
    });

    return res.status(200).json({
      success: true,
      url: image.data[0].url
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Image generation failed"
    });
  }
}

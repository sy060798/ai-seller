import { openai } from "./_utils/openai.js";

export default async function handler(req, res) {

  const body = JSON.parse(req.body);

  const prompt = body.prompt;

  const image = await openai.images.generate({
    model: "gpt-image-1",
    prompt: `high quality product advertising poster, cinematic lighting: ${prompt}`,
    size: "1024x1024"
  });

  res.status(200).json({
    success: true,
    url: image.data[0].url
  });
}

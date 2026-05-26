// api/upload.js

export default async function handler(req, res) {
  try {
    const body = req.body || {};

    // kalau nanti kamu kirim image base64
    const image = body.image || null;

    if (!image) {
      return res.status(400).json({
        success: false,
        error: "No image provided"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Upload received (base64 mode)",
      image
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return res.status(500).json({
      success: false,
      error: "Upload failed"
    });
  }
}

export default async function handler(req, res) {
  try {
    return res.status(200).json({
      success: true,
      message: "Upload ready",
      note: "Upgrade to Cloudinary / Supabase Storage for real file upload"
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Upload failed"
    });
  }
}

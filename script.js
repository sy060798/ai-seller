const API = "/api";

async function generateAI() {

  const prompt = document.getElementById("prompt").value;
  const style = document.getElementById("style").value;

  const payload = {
    productText: prompt,
    style
  };

  const script = await fetch(`${API}/generate-script`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(r => r.json());

  const image = await fetch(`${API}/generate-image`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(r => r.json());

  const video = await fetch(`${API}/generate-video`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(r => r.json());

  console.log(script, image, video);

  if (image.url) {
    document.querySelectorAll("img")[0].src = image.url;
  }

  if (video.video) {
    document.querySelector("video source").src = video.video;
    document.querySelector("video").load();
  }
}

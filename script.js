const API = "/api";

// ======================
// 🎵 MUSIC SYSTEM
// ======================
const audio = new Audio();
audio.loop = true;
audio.volume = 0.4;

const musicMap = {
  tech: "assets/music/tech1.mp3",
  soft: "assets/music/soft1.mp3",
  upbeat: "assets/music/upbeat1.mp3",
  industrial: "assets/music/industrial1.mp3",
  random: "assets/music/default.mp3"
};

function playMusic(style = "random") {
  const src = musicMap[style] || musicMap.random;
  audio.src = src;

  audio.play().catch(() => {
    console.log("Music blocked until user interaction");
  });
}

// ======================
// 📦 GET INPUT DATA
// ======================
function getInputData() {
  return {
    productText: document.getElementById("prompt").value,
    voice: document.getElementById("voice").value,
    style: document.getElementById("style").value,
    imageFile: document.getElementById("imageInput")?.files?.[0] || null
  };
}

// ======================
// 🤖 GENERATE AI FLOW
// ======================
async function generateAI() {

  const loading = document.getElementById("loading");
  loading.style.display = "block";

  const data = getInputData();

  playMusic(data.style);

  try {

    let base64Image = null;

    if (data.imageFile) {
      base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(data.imageFile);
      });
    }

    const payload = {
      productText: data.productText,
      voice: data.voice,
      style: data.style,
      image: base64Image
    };

    const scriptRes = await fetch(`${API}/generate-script`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const script = await scriptRes.json();
    console.log("SCRIPT AI:", script);

    const imageRes = await fetch(`${API}/generate-image`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const image = await imageRes.json();
    console.log("IMAGE AI:", image);

    const videoRes = await fetch(`${API}/generate-video`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const video = await videoRes.json();
    console.log("VIDEO AI:", video);

    renderResult(image, video, script);

  } catch (err) {
    console.error(err);
    alert("Error generate AI!");
  }

  loading.style.display = "none";
}

// ======================
// 🖼️ RENDER HASIL
// ======================
function renderResult(image, video, script) {

  const img1 = document.querySelectorAll(".result-box img")[0];
  if (img1 && image?.url) img1.src = image.url;

  const img2 = document.querySelectorAll(".result-box img")[1];
  if (img2 && image?.url) img2.src = image.url;

  const videoEl = document.querySelector("video source");
  if (videoEl && video?.url) {
    videoEl.src = video.url;
    videoEl.parentElement.load();
  }

  console.log("SCRIPT RESULT:", script);
}

// ======================
// 🎛️ STYLE MUSIC CHANGE
// ======================
document.getElementById("style").addEventListener("change", (e) => {
  playMusic(e.target.value);
});

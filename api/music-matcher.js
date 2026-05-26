import { musicConfig } from "./music-config.js";

export default function musicMatcher(prompt = "", style = "default") {
  const text = prompt.toLowerCase();

  if (text.includes("solder") || text.includes("elektronik")) {
    style = "tech";
  }

  if (text.includes("baju") || text.includes("fashion")) {
    style = "soft";
  }

  if (text.includes("promo") || text.includes("diskon")) {
    style = "upbeat";
  }

  const list = musicConfig[style] || musicConfig.default;

  const file = list[Math.floor(Math.random() * list.length)];

  return file.startsWith("assets/")
    ? file
    : `/assets/music/${file}`;
}

export default function randomStyle() {
  const styles = ["tech", "soft", "upbeat", "cinematic"];
  return styles[Math.floor(Math.random() * styles.length)];
}

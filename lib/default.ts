export default {
  yt_host: [
    "music.youtube.com", "www.youtube.com", "www.youtube-nocookie.com",
    "youtube.com", "youtu.be"
  ],
  format: {
    video: ["480","720","1080","1440","4k","8k"],
    audio: ["mp3","ogg","wav","m4a","webm","aac","opus"]
  },
  hosting: "https://loader.to",
  dns_override: {
    "loader.to": ["172.67.198.191", "104.21.95.172"]
  } as Record<string, string[]>,
}
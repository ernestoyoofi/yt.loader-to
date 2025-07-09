import _default from "../default"

export default function getYoutubeVideoID(url: string) {
  const parsedUrl = new URL(url)
  const host = parsedUrl.hostname
  const hostIndex = _default.yt_host.indexOf(host)
  const pathSegments = parsedUrl.pathname.split("/").filter(segment => segment !== "")
  let videoId: string|null|undefined = undefined
  if (pathSegments.length > 0) {
    const firstSegment = pathSegments[0]
    switch (firstSegment) {
      case "watch":
        videoId = pathSegments[1] || new URLSearchParams(parsedUrl.search).get("v")
        break;
      case "shorts":
      case "short":
      case "embed":
      case "short":
      case "live":
        videoId = pathSegments[1]
        break;
      default:
        videoId = firstSegment
        break;
    }
  }
  return {
    isValid: hostIndex !== -1 && typeof videoId === "string",
    id: videoId
  }
}
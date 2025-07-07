import _default from "../default"

interface getDownloadFormatReturn {
  format: string|undefined
  mediaType: string|undefined
}

export default function getDownloadFormat(inputformat: string|number): getDownloadFormatReturn {
  const stringifiedFormat = String(inputformat||"")
  const audioFormatIndex = _default.format.audio.indexOf(stringifiedFormat)
  const videoFormatIndex = _default.format.video.indexOf(stringifiedFormat)
  if(audioFormatIndex !== -1) {
    return {
      format: _default.format.audio[audioFormatIndex],
      mediaType: "audio"
    }
  }
  if(videoFormatIndex !== -1) {
    return {
      format: _default.format.video[videoFormatIndex],
      mediaType: "video"
    }
  }
  return {
    format: undefined,
    mediaType: undefined
  }
}
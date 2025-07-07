import { AxiosRequestConfig } from "axios"
import _default from "./default"
import DownloadMedia from "./request/download-media"
import GetInfoYoutubeContent, { GetInfoYoutubeContents } from "./request/get-info"

interface ConfigurationAPIYoutubeDownloader {
  hosting: String|"https://loader.to"
  axios_config?: AxiosRequestConfig
}

class API_YoutubeDownloader {
  public __axios_config?: AxiosRequestConfig
  public __hosting?: String

  constructor({ hosting = "", axios_config = {} }: ConfigurationAPIYoutubeDownloader) {
    this.__axios_config = axios_config
    this.__hosting = hosting||_default.hosting
  }
  async GetInfoYt(url: String): Promise<GetInfoYoutubeContents> {
    const urlStr = String(url||"")
    return await GetInfoYoutubeContent(
      urlStr, this.__axios_config
    )
  }
  async DownloadMedia(link: String, format: String): Promise<{ card?: any, url: String }> {
    return await DownloadMedia({
      link: String(link||""),
      format: (format || "720") as "480"|"720"|"1080"|"1440"|"4k"|"8k"|"mp3"|"ogg"|"wav"|"m4a"|"webm"|"aac"|"opus",
      options: {
        hosting: this.__hosting
      }
    })
  }
}

export default {
  ..._default,
  API_YoutubeDownloader,
  DownloadMedia,
  GetInfoYoutubeContent
}
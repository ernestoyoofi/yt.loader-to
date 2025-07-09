import { AxiosRequestConfig } from "axios"
import _default from "./default"
import DownloadMedia from "./request/download-media"
import GetInfoYoutubeContent, { GetInfoYoutubeContents } from "./request/get-info"
import { GetCostumAjaxURL } from "./yt/get-ajax-url"

// From ./yt/get-ajax-url.ts
interface CostumPathAjax {
  download: string
  info: string
}

interface ConfigurationAPIYoutubeDownloader {
  hosting: String|"https://loader.to"
  axios_config?: AxiosRequestConfig
  costum_ajax?: CostumPathAjax
  debugging?: Boolean
}

class API_YoutubeDownloader {
  public __axios_config?: AxiosRequestConfig
  public __hosting?: String
  private __getajax?: CostumPathAjax|undefined
  private __debugging?: Boolean

  constructor({ hosting = "", axios_config = {}, costum_ajax, debugging }: ConfigurationAPIYoutubeDownloader) {
    this.__axios_config = axios_config
    this.__hosting = hosting||_default.hosting
    this.__getajax = costum_ajax? GetCostumAjaxURL(costum_ajax):undefined
    this.__debugging = debugging
  }
  async GetInfoYt(url: String): Promise<GetInfoYoutubeContents> {
    const urlStr = String(url||"")
    return await GetInfoYoutubeContent(
      urlStr, this.__axios_config
    )
  }
  async DownloadMedia(link: String, format: String): Promise<{ card?: any, url: String }> {
    return await DownloadMedia({
      debugging: this.__debugging,
      link: String(link||""),
      format: (format || "720") as "480"|"720"|"1080"|"1440"|"4k"|"8k"|"mp3"|"ogg"|"wav"|"m4a"|"webm"|"aac"|"opus",
      options: {
        ajax: this.__getajax,
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
import { AxiosRequestConfig } from "axios"
import GetInfoYoutubeContentError from "../errors/get-info"
import getYoutubeVideoID from "../yt/get-yt-id"
import { RequestURL } from "../request"
import getDownloadFormat from "../yt/get-format"
import GetAjaxURL from "../yt/get-ajax-url"
import _default from "../default"
import GetProcessingDownloadError from "../errors/download-media"

export interface OptionsDownloadMedia {
  axios_config?: AxiosRequestConfig // Default Axios Config
  hosting?: String,
  ajax?: any
}
export interface Params_DownloadMedia {
  link: String // Require
  debugging?: Boolean // Debugging
  format: "480"|"720"|"1080"|"1440"|"4k"|"8k"|"mp3"|"ogg"|"wav"|"m4a"|"webm"|"aac"|"opus" // Require
  options?: OptionsDownloadMedia
}

// Source: https://video-download-api.com//?tab=rest-documentation#progress-endpoint-response-properties
export interface InfoContent_API_VideoDownloadAPI {
  id: String
  title: String
  link: String
  thumbnail: String
  channel?: {
    id: String
    name: String
    link: String|undefined
    verified: Boolean|undefined
    handle: String
    thumbnail: String
  }
  description: String
  views: Number
  uploaded: String
  duration: Number
  durationString: String
}
export interface API_Progress_VideoDownloadAPI {
  success: Boolean|Number
  progress?: Number|0|1000
  download?: String|null
  text?: String
  message?: String
}
export interface API_VideoDownloadAPI {
  success: true|Boolean
  id?: String
  content?: String
  info?: {
    image?: String|undefined
    title?: String|undefined
  }
  repeat_download: true|Boolean
  message?: String,
  cachehash?: String,
  additional_info?: InfoContent_API_VideoDownloadAPI
  progress_url?: String,
  extended_duration?: Number|null|undefined
}

async function GetProcessingDownload(hosting: String, idWorker: string, axios_config?: AxiosRequestConfig, isDebug?: Boolean): Promise<{ url: String }> {
  if(!idWorker) {
    throw new GetProcessingDownloadError("Id Worker Not Found!", "ID_WORKER_NOT_FOUNDED")
  }
  const urlProgress = String(GetAjaxURL("download", String(hosting||""))+"?id="+idWorker)
  if(isDebug) {
    console.log("[Debugging GetProcessingDownload]: Get Ajax Progress:", urlProgress)
  }
  const requestProgress = await RequestURL(urlProgress, axios_config)
  if(isDebug) {
    console.log("[Debugging GetProcessingDownload]: Progress API:", requestProgress.data)
  }
  const dataResult: API_Progress_VideoDownloadAPI|any = requestProgress.data
  if(dataResult?.success != 1) {
    await new Promise((a) => setTimeout(a, 1500)) // Sleep on 1.5seconds
    return await GetProcessingDownload(
      hosting, idWorker, axios_config, isDebug
    )
  }
  return {
    url: dataResult.download_url
  }
}

export default async function DownloadMedia({ link = "", debugging, format = "720", options = {} }: Params_DownloadMedia): Promise<{ card?: InfoContent_API_VideoDownloadAPI|any, url: String }> {
  const validate = getYoutubeVideoID(String(link||""))
  const formatOpt = getDownloadFormat(format)
  const isDebug = !!(typeof debugging === "boolean" && !!debugging)?true:false
  if(isDebug) {
    console.log("[Debugging DownloadMedia]: Checking Validation Youtube:", validate)
  }
  if(!validate.isValid) {
    throw new GetInfoYoutubeContentError("Link YouTube is not valid!", "INVALID_URL")
  }
  if(!formatOpt.format) {
    throw new GetInfoYoutubeContentError("Format is not accepted!", "INVALID_FORMAT")
  }
  const loadHosting = new URL(
    String(options.hosting||_default.hosting||"")
  ).origin
  const urlBuild = new URLSearchParams({
    url: `https://www.youtube.com/watch?v=${validate.id}`,
    add_info: "1",
    format: formatOpt.format
  }).toString()
  const urlInfo = !options?.ajax? `${GetAjaxURL("info", loadHosting)}?${urlBuild}`
  :`${options?.ajax("info", loadHosting)}?${urlBuild}`
  if(isDebug) {
    console.log("[Debugging DownloadMedia]: Ajax URL Info:", urlInfo)
  }
  // Get Id And Basic Information
  const getInfo = await RequestURL(urlInfo, (options.axios_config||{}))
  const dataWorker: API_VideoDownloadAPI|any = (getInfo.data||{})
  const idWorker = String(dataWorker.id||"")
  const cardInfo = dataWorker.additional_info? {
    image: dataWorker.additional_info.thumbnail,
    title: dataWorker.additional_info.title,
    description: dataWorker.additional_info.description,
    views: dataWorker.additional_info.views,
    id: dataWorker.additional_info.id,
    link: dataWorker.additional_info.link,
    creator: {
      picture: dataWorker.additional_info.channel.thumbnail,
      name: dataWorker.additional_info.channel.name,
      username: dataWorker.additional_info.channel.handle,
      id: dataWorker.additional_info.channel.id,
      link: dataWorker.additional_info.channel?.link || dataWorker.additional_info.channel?.url,
    }
  }:null
  const getDownloadProgress = await GetProcessingDownload(loadHosting, idWorker, (options.axios_config||{}), isDebug)
  const getURL = String(getDownloadProgress.url||"")
  return {
    card: cardInfo,
    url: getURL
  }
}
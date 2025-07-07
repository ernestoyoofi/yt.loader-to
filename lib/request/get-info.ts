import { AxiosRequestConfig } from "axios"
import * as cheerio from "cheerio"
import GetInfoYoutubeContentError from "../errors/get-info"
import getYoutubeVideoID from "../yt/get-yt-id"
import { RequestURL } from "../request"

interface ChannelInfo {
  pp: string
  name: string
  url_ch: string
}
export interface GetInfoYoutubeContents {
  image: string
  title: string
  description: string
  view?: number
  like?: number
  id: string
  yt_url: string
  channel: ChannelInfo
}

export default async function GetInfoYoutubeContent(url: string, axios_config?: AxiosRequestConfig): Promise<GetInfoYoutubeContents> {
  const validate = getYoutubeVideoID(url)
  if(!validate.isValid) {
    throw new GetInfoYoutubeContentError("Link YouTube is not valid!", "INVALID_URL")
  }
  const getRequest = await RequestURL(`https://www.youtube.com/watch?v=${validate.id}`, {
    ...(axios_config||{})
  })
  if(getRequest.isError) {
    throw new GetInfoYoutubeContentError(getRequest.error, "REQUEST_AXIOS_ERROR")
  }
  const $ = cheerio.load(getRequest.data)

  let getScript: string[] = []
  $("body script").each((i, el) => {
    const text = String($(el).text()||"")
    if(text.match("var ytInitialData = ")) {
      getScript.push(text)
    }
  })

  if(!getScript.length || !getScript[0]) {
    throw new GetInfoYoutubeContentError("Failed to extract YouTube inital data!", "EXTRACTION_DATA_YOUTUBE")
  }
  
  const getScriptInit = getScript[0]
  const dataJs = getScriptInit.slice(20, getScriptInit.length - 1)
  const dataJson = JSON.parse(dataJs)
  const contents = dataJson.contents.twoColumnWatchNextResults.results.results.contents
  const videoContent = contents[0].videoPrimaryInfoRenderer
  const ownerContent = contents[1].videoSecondaryInfoRenderer

  return {
    image: `https://i.ytimg.com/vi/${validate.id}/hqdefault.jpg`,
    title: videoContent.title.runs[0].text,
    description: ownerContent.attributedDescription.content,
    // view: Number(
    //   String(videoContent.viewCount.videoViewCountRenderer.viewCount.simpleText).replace(/\D/g, "")
    // ),
    // like: Number(
    //   String(videoContent.videoActions.menuRenderer.topLevelButtons[0].segmentedLikeDislikeButtonRenderer.likeButton.toggleButtonRenderer.defaultText.simpleText).replace(/\D/g, "")
    // ),
    id: String(validate.id||""),
    yt_url: `https://youtu.be/${validate.id}?feature=share`,
    channel: {
      pp: ownerContent.owner.videoOwnerRenderer.thumbnail.thumbnails[0].url,
      name: ownerContent.owner.videoOwnerRenderer.title.runs[0].text,
      url_ch: `https://youtube.com${ownerContent.owner.videoOwnerRenderer.title.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url}`
    }
  }
}
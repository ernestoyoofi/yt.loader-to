const _urlParse = require("url").parse
const _cfg = require("./config")

const youtube_url = (url) => {
  const _urls = _urlParse(url)
  const host = _urls.hostname
  const _i_sec = _cfg.yt_host.indexOf(host)

  let _id_watch = undefined

  if(_urls.pathname.split("/")[1] === "watch") {
    if(_urls.pathname.split("/")[2]) {
      _id_watch = _urls.pathname.split("/")[2]
    } else {
      _id_watch = new URLSearchParams(_urls.search).get("v")
    }
  } else if(_urls.pathname.split("/")[1] === "embed") {
    _id_watch = _urls.pathname.split("/")[2]
  } else if(_urls.pathname.split("/")[1] === "short") {
    _id_watch = _urls.pathname.split("/")[2]
  } else if(_urls.pathname.split("/")[1] === "live") {
    _id_watch = _urls.pathname.split("/")[2]
  } else {
    _id_watch = _urls.pathname.split("/")[1]
  }

  return {
    valid: _i_sec != -1? typeof _id_watch === "string" : false,
    id: _id_watch
  }
}

const format_download = (format) => {
  const _st_format = String(format)
  const _video = _cfg.format.video.indexOf(_st_format)
  const _audio = _cfg.format.audio.indexOf(_st_format)

  if(_audio != -1) {
    return {
      format: _cfg.format.audio[_audio],
      media_type: "audio"
    }
  }

  if(_video != -1) {
    return {
      format: _cfg.format.video[_video],
      media_type: "video"
    }
  }

  return {
    format: undefined,
    media_type: undefined
  }
}

const get_url_ajax = (type) => {
  const urls = _urlParse(_cfg.host)
  const ts_type = ["download", "info"]
  const ts_cxmt = ["progress.php", "download.php"]
  const ts_ixpe = ts_type.indexOf(type)

  const origin = `${urls.protocol || "https:"}//${urls.host}`

  if(ts_ixpe === -1) {
    return undefined
  }

  return origin + "/ajax/" + ts_cxmt[ts_ixpe]
}

module.exports = {
  youtube_url,
  format_download,
  get_url_ajax
}
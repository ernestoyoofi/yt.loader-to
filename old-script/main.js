const _cfg = require("./lib/config")
const _valid = require("./lib/valid")
const _fetch = require("./lib/fetch")

module.exports = {
  _cfg,
  _valid,
  info: _fetch.ytInfo,
  download: _fetch.downloadMedia
}
const fs = require("fs")
const path = require("path")

const isJsonValid = (strings) => {
  try {
    JSON.parse(strings)
    return true
  } catch(err) {
    return false
  }
}
const getInfo = () => {
  const paths = path.join(process.cwd(), "id-collection.json")
  const found = fs.existsSync(paths)? fs.lstatSync(paths).isFile() : false

  return {
    path: paths,
    isFound: found,
    isJson: found? isJsonValid(fs.readFileSync(paths, "utf-8")) : false
  }
}

/**
 * 
 * @param {*} ytId 
 * @param {*} format 
 * @returns {undefined|string}
 */
const getURLDownload = (ytId, format) => {
  const infos = getInfo()
  if(!infos.isFound || !infos.isJson) {
    fs.writeFileSync(infos.path, "{}", "utf-8")
    return undefined
  }

  const data = JSON.parse(fs.readFileSync(infos.path, "utf-8"))

  if(!data[ytId]) {
    return undefined
  }
  if(!data[ytId][format]) {
    return undefined
  }

  return data[ytId][format]
}

const saveURLDownload = (ytId, format, url) => {
  const infos = getInfo()
  if(!infos.isFound || !infos.isJson) {
    fs.writeFileSync(infos.path, "{}", "utf-8")
  }

  const data = JSON.parse(fs.readFileSync(infos.path, "utf-8"))

  data[ytId] = {
    [format]: url
  }

  fs.writeFileSync(infos.path, JSON.stringify(data, null, 2), "utf-8")
}

module.exports = {
  getURLDownload,
  saveURLDownload
}
module.exports = function (text) {
  if(typeof text != 'string') {
    return undefined
  }

  let collection = ""
  let numrict = "1234567890".split("")
  for(let i of text.split("")) {
    if(numrict.indexOf(i) != -1) {
      collection += i
    }
  }

  return Number(collection)
}
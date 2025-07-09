// Remove Dist Development
const fs = require("fs")
const path = require("path")
const paths = path.join(__dirname, "dist")
fs.rmSync(paths, { force: true, recursive: true })
import _default from "../default"

export default function GetAjaxURL(reqType: string, hosting?: string): string {
  const parsedHostUrl = new URL(
    String(hosting||_default.hosting||"")
  )
  const origin = `${parsedHostUrl.protocol || "https:"}//${parsedHostUrl.host}`
  const pathRegister: Record<string, string> = {
    download: "/api/progress",
    info: "/api/download"
  }
  const getType: string = pathRegister[reqType]||"/"
  return String(
    new URL(getType, origin).href
  )
  // const validRequestTypes = ["download", "info"]
  // const ajaxEndpoints = ["progress", "download"]
  // const typeIndex = validRequestTypes.indexOf(reqType)
  // if (typeIndex === -1) {
  //   return origin
  // }
  // return `${origin}/api/${ajaxEndpoints[typeIndex]}`
}
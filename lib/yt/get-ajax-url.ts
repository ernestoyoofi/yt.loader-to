import _default from "../default"

interface CostumPathAjax {
  download: string
  info: string
}

type CostumPathAjaxKey = keyof CostumPathAjax;

const defaultPathRegister: CostumPathAjax = {
  download: "/api/progress",
  info: "/api/download"
}

export function GetCostumAjaxURL(costumPath: CostumPathAjax = defaultPathRegister): any {
  const costumRegister = {
    download: costumPath.download,
    info: costumPath.info
  }
  return (reqType: CostumPathAjaxKey, hosting?: string): string => {
    const parsedHostUrl = new URL(
      String(hosting||_default.hosting||"")
    )
    const origin = `${parsedHostUrl.protocol || "https:"}//${parsedHostUrl.host}`
    const getType: string = costumRegister[reqType]||""
    return String(
      new URL(getType, origin).href
    )
  }
}

export default function GetAjaxURL(reqType: CostumPathAjaxKey, hosting?: string): string {
  const parsedHostUrl = new URL(
    String(hosting||_default.hosting||"")
  )
  const origin = `${parsedHostUrl.protocol || "https:"}//${parsedHostUrl.host}`
  const getType: string = defaultPathRegister[reqType]||""
  return String(
    new URL(getType, origin).href
  )
}
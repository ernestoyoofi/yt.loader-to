import { AxiosRequestConfig } from "axios"
import axios from "axios"
import https from "https"
import http from "http"
import { isIP } from "net"
import _default from "./default"

interface OptionRequest {
  url?: string
  method?: "GET"|"POST"|"DELETE"|"PUT"
  headers?: {}
  params?: {}
  data?: Object|String|undefined
  timeout?: number
}

interface ResultHTTPRequest {
  isError?: Boolean
  error?: String|any
  status?: Number
  statusText?: String
  headers?: {}
  data?: Object|String|null
}

function createAgent(url: string): https.Agent | http.Agent | undefined {
  const parsedUrl = new URL(String(url||""))
  const hostname = parsedUrl.hostname
  const overrides = (_default.dns_override || {})[hostname]
  if(!overrides || !overrides.length) return undefined
  const ip = overrides[0]
  const family = isIP(ip) || 4
  const lookup: any = (hostname: string, options: any, callback: (err: NodeJS.ErrnoException | null, address: string, family: number) => void) => {
    callback(null, ip, family)
  }
  if(parsedUrl.protocol === "https:") {
    return new https.Agent({ lookup, keepAlive: true })
  }
  return new http.Agent({ lookup, keepAlive: true })
}

export async function RequestURL(url: string, options?: OptionRequest|AxiosRequestConfig): Promise<ResultHTTPRequest> {
  try {
    const agent = createAgent(url)
    const axiosdefault: any = {
      url: String(url||""),
      ...(agent ? { httpsAgent: agent, httpAgent: agent } : {}),
      headers: {
        "accept": "*/*",
        "accept-language": "id,en-US;q=0.9,en;q=0.8,ms;q=0.7",
        "cookie": "_ga_JQXWSK7VEK=GS1.1.1737284104.1.1.1737284811.0.0.0;",
        "dnt": "1",
        "origin": new URL(url).origin,
        "sec-ch-ua": `"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"`,
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:34.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        ...(options?.headers||{})
      },
      ...options,
    }
    if(agent) {
      delete axiosdefault.proxy
    }
    const axiosrequest = await axios.request(axiosdefault)
    return {
      status: axiosrequest.status,
      statusText: axiosrequest.statusText,
      headers: axiosrequest.headers,
      data: axiosrequest.data,
    }
  } catch(e: any) {
    const response = e.response
    if(response) {
      return {
        error: e.stack,
        isError: true,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data,
      }
    }
    return {
      isError: true,
      error: e.stack
    }
  }
}

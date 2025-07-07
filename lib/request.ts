import { AxiosRequestConfig } from "axios"
import axios from "axios"

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

export async function RequestURL(url: string, options?: OptionRequest|AxiosRequestConfig): Promise<ResultHTTPRequest> {
  try {
    const axiosdefault = {
      url: String(url||""),
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
        isError: false,
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
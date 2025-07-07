export default class GetProcessingDownloadError extends Error {
  public code?: string
  public detail?: any

  constructor(message: string, code?: string, detail?: any) {
    super(message)
    this.name = 'GetInfoYoutubeContent'
    Object.setPrototypeOf(this, GetProcessingDownloadError.prototype)

    this.code = code
    this.detail = detail
  }
}
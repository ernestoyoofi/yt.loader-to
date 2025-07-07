export default class GetInfoYoutubeContentError extends Error {
  public code?: string
  public detail?: any

  constructor(message: string, code?: string, detail?: any) {
    super(message)
    this.name = 'GetInfoYoutubeContent'
    Object.setPrototypeOf(this, GetInfoYoutubeContentError.prototype)

    this.code = code
    this.detail = detail
  }
}
# @ernestoyoofi/yt.loader-to

[![npm version](https://img.shields.io/npm/v/@ernestoyoofi/yt.loader-to.svg)](https://www.npmjs.com/package/@ernestoyoofi/yt.loader-to)
[![npm downloads](https://img.shields.io/npm/dm/@ernestoyoofi/yt.loader-to.svg)](https://www.npmjs.com/package/@ernestoyoofi/yt.loader-to)

An unofficial, promise-based API wrapper for `loader.to` to fetch YouTube video information and generate download links. Written in TypeScript, it's fully typed and easy to use in any Node.js project.

## 📚 Installation

Install the package using your favorite package manager:

```bash
# Using npm
npm install @ernestoyoofi/yt.loader-to
# Using yarn
yarn add @ernestoyoofi/yt.loader-to
# Using pnpm
pnpm add @ernestoyoofi/yt.loader-to
```

## 📦 Usage

The library can be used via the main `API_YoutubeDownloader` class or through standalone functions. The class-based approach is recommended for managing configurations easily like this.

```js
import { API_YoutubeDownloader } from "@ernestoyoofi/yt.loader-to"
// Or
const { API_YoutubeDownloader } = require("@ernestoyoofi/yt.loader-to").default
const youtube = new API_YoutubeDownloader({
  hosting: "", // by default is https://loader.to
  axios_config: {
    // configuration for axios
  }
})

async function getVideoInfo() {
  const videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  const getInfo = await youtube.GetInfoYt(videoUrl)
  console.log(info) // Return data information
// {
//   image: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
//   title: 'Rick Astley - Never Gonna Give You Up (Official Video) (4K Remaster)',
//   description: '“Never Gonna Give You Up” was a global smash on its release in July 1987, topping the charts in 25 countries including Rick’s native UK and the US Billboard Hot 100....',
//   id: 'dQw4w9WgXcQ',
//   yt_url: 'https://youtu.be/dQw4w9WgXcQ?feature=share',
//   channel: {
//     pp: 'https://yt3.ggpht.com/K2ecE5j90a_DFzugHo0bW98vFlIQ1JJgs9mbcav7RGy1t7adJRnd2jaIv-oc6XzTRvDdWlFCAfc=s48-c-k-c0x00ffffff-no-rj',
//     name: 'Rick Astley',
//     url_ch: 'https://youtube.com/channel/UCuAXFkgsw1L7xaCfnd5JJOw'
//   }
// }
}

async function getDownload() {
  const videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  const getUrlDown = await youtube.DownloadMedia(videoUrl, "1080")
  console.log(getUrlDown) // Return data
// {
//   card: {
//     image: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',      
//     title: 'Rick Astley - Never Gonna Give You Up (Official Video) (4K Remaster)',
//     description: undefined,
//     views: '1,671,788,874 views',
//     id: 'dQw4w9WgXcQ',
//     link: undefined,
//     creator: {
//       picture: undefined,
//       name: 'Rick Astley',
//       username: undefined,
//       id: 'UCuAXFkgsw1L7xaCfnd5JJOw',
//       link: 'https://www.youtube.com/@RickAstleyYT'
//     }
//   },
//   url: 'https://rebecca47.oceansaver.in/pacific/?Cjuh4loP1OXEp6KypbQYWVY'
// } 
}
```

## 📦 Direct Functions (Optional Usage)

You can also use the methods directly without class instance:

```js
import { DownloadMedia, GetInfoYoutubeContent } from "@ernestoyoofi/yt.loader-to"
// Or
const { DownloadMedia, GetInfoYoutubeContent } = require("@ernestoyoofi/yt.loader-to").default

// ... other code
  // Get Info Content
  const info = await GetInfoYoutubeContent("https://youtube.com/watch?v=VIDEO_ID")
  // Get URL Media Download
  const media = await DownloadMedia({
    link: "https://youtube.com/watch?v=VIDEO_ID",
    format: "720"
  })
// ... other
```

## 📽️ Format Media Downloader

For video it can be from 480 - 8k and for audio it starts from mp3, ogg, wav, m4a, webm, aac, and opus, read the [documentation here](https://video-download-api.com//?tab=rest-documentation#format-options).

```txt
format = {
  video: ["480", "720", "1080", "1440", "4k", "8k"],
  audio: ["mp3", "ogg", "wav", "m4a", "webm", "aac", "opus"]
}
```

## 🔖 Main Of Module

```js
export default {
  API_YoutubeDownloader,
  DownloadMedia,
  GetInfoYoutubeContent,
  yt_host,
  format,
  hosting,
};
```

## ⚠️ Error Handling

- `GetInfoYoutubeContentError`: Thrown when fetching YouTube video info fails.
- `GetProcessingDownloadError`: Thrown when downloading or processing the media link fails.

If there is a problem, please add a report or fix it with [pull request](https://github.com/ernestoyoofi/yt.loader-to) in the repository.

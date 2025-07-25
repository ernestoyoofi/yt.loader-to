const APIDownload = require("./dist/lib/main")

APIDownload.default.DownloadMedia({
  debugging: true,
  link: "https://www.youtube.com/shorts/dQw4w9WgXcQ"
}).then(console.log)

// console.log(APIDownload({
//   download: "/api/path/download",
//   info: "/api/path/info"
// })("download"))
// console.log(APIDownload({
//   download: "/api/path/download",
//   info: "/api/path/info"
// })("info"))
// console.log(APIDownload({
//   download: "/api/path/download",
//   info: "/api/path/info"
// })("download", "googe.com"))
// console.log(APIDownload({
//   download: "/api/path/download",
//   info: "/api/path/info"
// })("info", "googe.com"))

// console.log(APIDownload("https://www.youtube.com/watch?v=dQw4w9WgXcQ"))
// console.log(APIDownload("https://www.youtube.com/shorts/zGS-wL4fMag"))
// console.log(APIDownload("https://www.youtube.com/live/dQw4w9WgXcQ"))
// console.log(APIDownload("https://youtu.be/ULp8GYfDHY4?si=Gf8K2X-0dyvZ2xje"))

// APIDownload.GetInfoYoutubeContent("https://www.youtube.com/watch?v=dQw4w9WgXcQ").then(a => console.log(a))
// APIDownload.DownloadMedia({
//   link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
// }).then(a => console.log(a))
// APIDownload.DownloadMedia({
//   link: "https://www.youtube.com/shorts/zGS-wL4fMag",
// }).then(a => console.log(a))

// const yt = require("./main")

// // 📂 Download Media
// yt.download({
//   yt_link: "https://music.youtube.com/watch?v=m8Zqd58XuoA&list=OLAK5uy_n0t6KymP-tb3EUjViyWXXA4cT1raHJEl8",
//   yt_format: "mp3",
//   logs: false,
//   saveId: true
// }).then(results => {
//   console.log(results)

//   // {
//   //   info: {
//   //     image: 'https://i.ytimg.com/vi/m8Zqd58XuoA/hqdefault.jpg',
//   //     title: 'Kawaii Aesthetic',
//   //     description: 'Provided to YouTube by IIP-DDS\n' +
//   //       '\n' +
//   //       'Kawaii Aesthetic · Tollan Kim\n' +
//   //       '\n' +
//   //       'Kawaii Aesthetic\n' +
//   //       '\n' +
//   //       '℗ Tollan Kim\n' +
//   //       '\n' +
//   //       'Released on: 2022-06-15\n' +
//   //       '\n' +
//   //       'Composer: Lucas de Oliveira Santos\n' +
//   //       '\n' +
//   //       'Auto-generated by YouTube.',
//   //     view: 1571,
//   //     like: 26,
//   //     id: 'm8Zqd58XuoA',
//   //     yt_url: 'https://youtu.be/m8Zqd58XuoA?feature=share',
//   //     channel: {
//   //       pp: 'https://yt3.ggpht.com/iAwS5R6mvBqkzrGVqgMdHOWZy38gdZnoa4quANIQ4wzkWs2YmspKvLCzG9sK3lTba86KvC4E7A=s48-c-k-c0x00ffffff-no-rj',
//   //       name: 'Tollan Kim - Topik',
//   //       url_ch: 'https://youtube.com/channel/UCJmVKm8H-Pe62TumtF0bZTQ'
//   //     }
//   //   },
//   //   media: 'https://marilyn7.oceansaver.in/pacific/?k7Ck2foXI1QgGl9rQ37bjBE9HXQ'
//   // }
// })

// // 📃 Youtube Information Video
// yt.api.ytInfo({
//   yt_link: "https://youtube.com/watch?v=4V4hl7xMBN4"
// }).then(results => {
//   console.log(results)

//   // {
//   //   image: 'https://i.ytimg.com/vi/4V4hl7xMBN4/hqdefault.jpg',
//   //   title: 'METAMORPHOSIS (Arabic Version)',
//   //   description: 'Provided to YouTube by DistroKid\n' +
//   //     '\n' +
//   //     'METAMORPHOSIS (Arabic Version) · YAD Oud\n' +
//   //     '\n' +
//   //     'METAMORPHOSIS (Arabic Version)\n' +
//   //     '\n' +
//   //     '℗ YAD Oud\n' +
//   //     '\n' +
//   //     'Released on: 2023-01-19\n' +
//   //     '\n' +
//   //     'Auto-generated by YouTube.',
//   //   view: 79102,
//   //   like: 3,
//   //   id: '4V4hl7xMBN4',
//   //   yt_url: 'https://youtu.be/4V4hl7xMBN4?feature=share',
//   //   channel: {
//   //     pp: 'https://yt3.ggpht.com/pvRn3YQ-taoDHVAovO7zY1KaGlOUCKiyc2u5TYChpZXfhaaKY_dIkY9JHHrYcWsVBB4QB7b2GQ=s48-c-k-c0x00ffffff-no-rj',
//   //     name: 'YAD Oud',
//   //     url_ch: 'https://youtube.com/channel/UCKy7co9mviDMq6u2JIL_Rsw'
//   //   }
//   // }
// })
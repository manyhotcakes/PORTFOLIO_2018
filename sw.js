importScripts('/PORTFOLIO_2018/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "portfolio",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/PORTFOLIO_2018/_nuxt/10.f83e234336fbcbaa1108.js",
    "revision": "1ac0e3e1559d9a22e0f8e9779c4b1ed9"
  },
  {
    "url": "/PORTFOLIO_2018/_nuxt/4.fb1d3c311453a2a2ce01.js",
    "revision": "bd9684fb75f7990fe8b4efc0ae5dde19"
  },
  {
    "url": "/PORTFOLIO_2018/_nuxt/5.cfe084d9eaefb33c0f98.js",
    "revision": "57491ed2807b0bb8dc65ca4d40fc28e3"
  },
  {
    "url": "/PORTFOLIO_2018/_nuxt/5d3ec484d393af680920.worker.js",
    "revision": "4d7aa1bcf9f81e1751fc8d6859f0b2e1"
  },
  {
    "url": "/PORTFOLIO_2018/_nuxt/6.d5f0d1ffc926d1d08063.js",
    "revision": "444edca1f230b7c108f4b2417c95c09e"
  },
  {
    "url": "/PORTFOLIO_2018/_nuxt/7.36e114ba38decc293f9a.js",
    "revision": "d384f9fcfd1623dc13a4ffa21f83ddfe"
  },
  {
    "url": "/PORTFOLIO_2018/_nuxt/8.16902679490832107baf.js",
    "revision": "fdd02ee2d337392775f89cb9e0c5a2b4"
  },
  {
    "url": "/PORTFOLIO_2018/_nuxt/9.5b008c5bf22ce86e4e08.js",
    "revision": "62552ec5ec5abd5e91a6023c7f3c03b4"
  },
  {
    "url": "/PORTFOLIO_2018/_nuxt/app.a266d951c1349bec834a.js",
    "revision": "8d46e17d305dc0558b4489b00031e699"
  },
  {
    "url": "/PORTFOLIO_2018/_nuxt/layouts/default.d50095d323cb8db3d530.js",
    "revision": "5c702376fedebac3dc22aabb5cfc9988"
  },
  {
    "url": "/PORTFOLIO_2018/_nuxt/manifest.779606c548b93099c5de.js",
    "revision": "323893402111278bb13363b6ac0d1a39"
  },
  {
    "url": "/PORTFOLIO_2018/_nuxt/pages/index.3e8f2fae7e5c12a27bb6.js",
    "revision": "37da039913ba82bb24692588fa57b3de"
  },
  {
    "url": "/PORTFOLIO_2018/_nuxt/vendor.d66bcba7e2aa62e8ed82.js",
    "revision": "e40311f65b3a1397d63948f5ed1bac8c"
  }
])


workboxSW.router.registerRoute(new RegExp('/PORTFOLIO_2018/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/PORTFOLIO_2018/.*'), workboxSW.strategies.networkFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('https://fonts.googleapis.com/.*'), workboxSW.strategies.cacheFirst({}), 'GET')


const webpack = require("webpack")

module.exports = {
  /*
  ** Headers of the page
  */
  mode: "spa",
  head: {
    title: "portfolio",
    script: [
      {
        defer: true,
        src: "https://use.fontawesome.com/releases/v5.0.10/js/all.js",
        integrity:
          "sha384-slN8GvtUJGnv6ca26v8EzVaR9DC58QEwsIk9q1QXdCU8Yu8ck/tL/5szYlBbqmS+",
        crossorigin: "anonymous"
      }
    ],
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "2018 my portfolio pages with Nuxt.js"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Raleway"
      }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: "#3B8070" },
  router: {
    base: process.env.ROUTER_BASE || "/"
  },
  /*
  ** 拡張の読み込み
  */
  modules: [
    /*
    ** 共通 SASS 変数読み込み
    */
    ["nuxt-sass-resources-loader", ["@/assets/scss/variables.scss"]],
    "@nuxtjs/axios"
  ],
  plugins: [
    "@/plugins/globals.js",
    "@/plugins/axios.js",
    "@/plugins/preload.js",
    "@/plugins/validator.js"
  ],
  css: [{ src: "@/assets/scss/main.scss", lang: "scss" }],
  /*
  ** Build configuration
  */
  build: {
    // vendor: ['~/assets/crypt.js'],
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
      config.module.rules.push({
        include: require("path").resolve(__dirname, "assets/js/worker/"),
        test: /.js$/,
        use: { loader: "worker-loader" }
      })
      // config.entry.worker = "@/assets/js/worker/worker.js"
      // console.log(config.output, config.entry)
      // config.output.path = "/"
      // config.output.filename = "[name].js"
    },
    postcss: [
      require("autoprefixer")({
        browsers: ["last 2 versions"]
      })
    ],
    plugins: [
      new webpack.ProvidePlugin({
        _: "lodash"
      })
    ],
    /* eslint-disable */
    babel: {
      presets: [
        ["vue-app", { targets: { browsers: "last 2 versions" }, useBuiltIns: true }]
      ]
    }
  },
  env: {
    ROUTEPATH: `${process.env.ROUTER_BASE || ""}`,
    JSONDATAPATH: "data/",
    GITHUBUSERID: "manyhotcakes",
    PASSWORDHASH: "bc523a237636533c0f71d670a13c20fa",
    WORKER_MAXNUM: 4
  }
}

<template>
  <div>
    <img :src="decryptsrc" data-src="">
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios"

export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data(){
    return {
      decrypt: "",
      api: null,
    }
  },
  mounted(){
    this.init()
    if (!this.src) {
      throw new Error(`${this.$el.toString()} doesnt have src prop`)
    }
    console.log(this.$store.getters["session/pw"])
    if (this.$store.getters["session/pw"]){
      this.load()
    } else {
      this.$watch(() => this.$store.getters["session/pw"], (newval) => {
        if (newval){
          this.load()
        }
      })
    }
  },
  methods: {
    init(){
      // 各種インスタンス初期化
      // this.api = this.$axios
      // this.api = axios.create({
      //   timeout: 3000,
      //   // responseType: "arraybuffer",
      //   responseType: "json",
      //   baseURL: process.env.ROUTEPATH
      // })
      // // API の読み込み設定
      // this.api.interceptors.response.use(res => {
      //   try {
      //     if (res.status !== 200) {
      //       throw new Error("statusText is not ok")
      //     }
      //     if (typeof res.data === typeof {} && !res.data.data) {
      //       const crypt = new Crypt()
      //       // binary 読み込み後に暗号化処理
      //       console.log(
      //         `data:image/png;base64,${new Buffer(res.data, "binary").toString("base64")}`,
      //         '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
      //         `${
      //             // this.crypt.decrypt(
      //               crypt.encrypt(
      //                 new Buffer(res.data, "binary").toString("base64"), this.$store.getters["session/pw"]
      //               // )
      //           // ,this.$store.getters["session/pw"]
      //         )}`
      //       )
      //       throw new Error('type of "data" is not Object type')
      //     }
      //     return res.data.data
      //   } catch (e) {
      //     return Promise.reject([res.config.url, e])
      //   }
      // })
    },
    load(){
      // const crypt = new Crypt()
      const crypt = this.$crypt

      ;(async () => {
        const {data: encrypt} = await this.$axios.$get(this.src)
        this.decrypt = crypt.decrypt(
          encrypt,
          this.$store.getters["session/pw"]
        )
        this.$el.dispatchEvent(new Event("load"))
      })().catch(res => {
        throw new Error(res)
      })
    }
  },
  computed: {
    decryptsrc(){
      console.log(this.decrypt)
      return this.decrypt ? `data:image/png;base64,${this.decrypt}` : ""
    }
  }
}
</script>

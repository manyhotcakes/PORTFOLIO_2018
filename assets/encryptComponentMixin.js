import Loading from "~/components/contents/Loading.vue"
import Crypt from "~/assets/crypt.js"
import axios from "axios"

export default {
  components: {
    Loading
  },
  /**
   * 初期化処理。 mixin 呼び出し元よりさきに実行される
   * @return {[type]} [description]
   */
  mounted() {
    // 各種インスタンス初期化
    this.crypt = new Crypt()
    this.api = axios.create({
      timeout: 3000,
      baseURL: process.env.JSONDATAPATH
    })
    // API の読み込み設定
    this.api.interceptors.response.use(function(res) {
      try {
        if (res.status !== 200) {
          throw new Error("statusText is not ok")
        }
        if (typeof res.data !== typeof {}) {
          throw new Error('type of "data" is not Object type')
        }
        const data = res.data
        data._key = res.config.url.split(/[/,.]/).reverse()[1]
        return data
      } catch (e) {
        return Promise.reject([res.config.url, e])
      }
    })

    // body の読み込み
    ;(async () => {
      const { body: encrypt } = await this.api.get(
        `${this.$options.name}template.json`
      )
      const decrypt = this.crypt.decrypt(
        encrypt,
        this.$store.getters["session/pw"]
      )
      this.body = decrypt
    })()
  }
}

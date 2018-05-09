import Loading from "~/components/contents/Loading.vue"

export default {
  components: {
    Loading
  },
  data() {
    return {
      crypts: {},
      decryptFlg: true
    }
  },
  /**
   * 初期化処理。 mixin 呼び出し元よりさきに実行される
   * @return {[type]} [description]
   */
  mounted() {
    // 各種インスタンス初期化
    this.crypt = this.$crypt
    // json の読み込みと複合、コンポーネントへの組み込み
    ;(async () => {
      if (!this.$options.name) {
        throw new Error("Contents name is not defined")
      }
      // json の読み込み
      const encrypts = await this.$axios.$get(
        `${process.env.JSONDATAPATH}${this.$options.name}template.json`
      )
      // 複合
      const decrypts = _.cloneDeepWith(encrypts, v => {
        if (!_.isObject(v)) {
          if (this.decryptFlg) {
            return this.crypt.decrypt(v, this.$store.getters["session/pw"])
          } else {
            return v
          }
        }
      })
      // コンポーネントへの組み込み
      // 読み込んだ json と同一のkeyに格納される
      _.forEach(decrypts, (v, k) => {
        this.$set(this.crypts, k, v)
      })

      return await this.onFinish()
    })()
  },
  methods: {
    async onFinish() {
      // console.log("call parent")
      return true
    }
  }
}

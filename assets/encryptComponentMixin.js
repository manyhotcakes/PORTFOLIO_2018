import Loading from "~/components/contents/Loading.vue"

export default {
  components: {
    Loading
  },
  data() {
    return {
      body: ""
    }
  },
  /**
   * 初期化処理。 mixin 呼び出し元よりさきに実行される
   * @return {[type]} [description]
   */
  mounted() {
    // 各種インスタンス初期化
    this.crypt = this.$crypt
    // body の読み込み
    ;(async () => {
      if (!this.$options.name) {
        throw new Error("Contents name is not defined")
      }
      const { body: encrypt } = await this.$axios.$get(
        `${process.env.JSONDATAPATH}${this.$options.name}template.json`
      )
      // const decrypt = this.crypt.decrypt(
      //   encrypt,
      //   this.$store.getters["session/pw"]
      // )
      // this.body = decrypt
      this.body = encrypt
    })()
  }
}

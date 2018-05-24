/* eslint-disable */
import Loading from "~/components/contents/Loading.vue"
import Util from "@/assets/js/util.js"
import Worker from "@/assets/js/worker/worker.js"
import CryptRecursive from "~/assets/js/cryptRecursive"

export default {
  components: {
    Loading
  },
  data() {
    return {
      crypts: {},
      decryptFlg: true,
      loadend: false,
      loadingProcessing: {
        now: 0,
        max: 0
      }
    }
  },
  props: {
    color: {
      type: String,
      required: true
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

      // 現在の読み込み進捗度の分母を設定
      this.$set(this.loadingProcessing, "max", (() => {
        let count = 0
        _.cloneDeepWith(encrypts, (value) => {
          !_.isPlainObject(value) && !_.isArray(value) ? count ++ : 0
        })
        return count
      })())

      const cryptRecursive = new CryptRecursive(
        this.$options.name,
        this.$store.getters["session/pw"],
        "decrypt",
        "webworker"
      ).setOnProcesingCallback(_val => {
        this.$set(this.loadingProcessing, "now", _val)
      }).setWorkerInstance(new Worker)

      const max = cryptRecursive.getProcessingMax(encrypts)
      console.log("faaaaaaaaaa", max)
      this.$set(this.loadingProcessing, "max", max)
      let decrypts
      // 複合フラグがコンポーネントに指定されていれば、複合
      if (this.decryptFlg) {
        decrypts = await cryptRecursive.mapValuesDeep(encrypts)
      } else {
        decrypts = _.cloneDeep(encrypts)
      }

      // コンポーネントへの組み込み
      // 読み込んだ json と同一のkeyに格納される
      _.forEach(decrypts, (v, k) => {
        this.$set(this.crypts, k, v)
      })

      // 各コンポーネントに登録されている onFinish 関数を呼び出す
      const rs = await this.onFinish()
      this.loadend = true
      return rs
    })()
  },
  methods: {
    async onFinish() {
      // console.log("call parent")
      return true
    }
  }
}

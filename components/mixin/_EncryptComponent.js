/* eslint-disable */
import Loading from "~/components/contents/Loading.vue"
import Util from "@/assets/js/util.js"
import Worker from "@/assets/js/worker/worker.js"

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

      let decrypts
      if (this.decryptFlg) {
        decrypts = await this.mapValuesDeep(encrypts)
      } else {
        decrypts = _.cloneDeep(encrypts)
      }

      // コンポーネントへの組み込み
      // 読み込んだ json と同一のkeyに格納される
      _.forEach(decrypts, (v, k) => {
        this.$set(this.crypts, k, v)
      })

      const rs = await this.onFinish()
      this.loadend = true
      return rs
    })()
  },
  methods: {
    async onFinish() {
      // console.log("call parent")
      return true
    },
    // 複合再帰関数の親
    async mapValuesDeep(v) {
      const worker = new Worker
      const WORKER_MAXNUM = parseInt(process.env.WORKER_MAXNUM, 10)
      const stack = []
      const keystack = []
      let idx = 0
      const batchPromise = async (org, stack, keystack) => {
        const result = await Promise.all(stack)
        result.forEach((_v, _k) => {
          org = Util.setValWithKeyArray(org, keystack[_k], _v)
        })
        _.remove(stack)
        _.remove(keystack)
        return org
      }
      /**
       * 再帰関数本体
       * @param  {[type]}  v          探索対象
       * @param  {[type]}  key        v のキー名(ex: hoge2)
       * @param  {[type]}  currentkey 再帰関数呼び出し箇所までの v のキー名（ex: body.hoge.2.hoge2）
       * @param  {[type]}  org        オリジナルの引数値 v 全体
       * @return {Promise}            処理完了後、結果が返却される Promise
       */
      const mapValuesDeepRecursive = async (v, key, currentkey, org) => {
        if (typeof key !== "undefined") {
          currentkey.push(key)
        }
        var res
        // 配列、オブジェクトであれば再帰
        if (_.isPlainObject(v)) {
          for (let k of Object.keys(v)) {
            await mapValuesDeepRecursive(v[k], k, _.clone(currentkey), org)
          }
          return v
        } else if (_.isArray(v)) {
          for (let i = 0; i < v.length; i++) {
            await mapValuesDeepRecursive(v[i], i, _.clone(currentkey), org)
          }
          return v
        } else {
          // 復号化するものは promise だけ予約して、スタックに積む
          stack.push( Util.webWorkerSend(worker, "decrypt", {
            text: v,
            pw: this.$store.getters["session/pw"]
          }, true, `${this.$options.name}${idx++}`) )
          // 上記のリストの値に対応する、キーリストにも追加
          keystack.push( _.clone(currentkey) )

          // ある一定量スタックに貯まれば、処理完了まで待機させる
          if (stack.length > WORKER_MAXNUM) {
            org = await batchPromise(org, stack, keystack)
          }

          // ダミーのプロミス。呼び出しと同時に完了
          return new Promise((resolve) =>
            resolve()
          ).then(() => {
            // 現在の読み込み進捗度の更新
            this.$set(this.loadingProcessing, "now", idx)
          })
        }
      }
      // 引数値のオリジナルを保存
      var org = _.cloneDeep(v)
      // 再帰処理開始
      const result = await mapValuesDeepRecursive(org, undefined, [], org)

      // スタックが残ったままなら処理を行う
      if (stack.length > 0) {
        org = await batchPromise(org, stack, keystack)
      }
      return org
    }
  }
}

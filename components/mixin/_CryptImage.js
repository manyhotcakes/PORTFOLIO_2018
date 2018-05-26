import Util from "@/assets/js/util.js"
import Worker from "@/assets/js/worker/worker.js"

export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      decrypt: "",
      api: null,
      loaded: false,
      success: true,
      isNoimage: false
    }
  },
  mounted() {
    if (!this.src) {
      this.isNoimage = true
      // throw new Error(`${this.$el.toString()} doesnt have src prop`)
      // return
    }
    if (this.$store.getters["session/pw"]) {
      this.load()
    } else {
      this.$watch(
        () => this.$store.getters["session/pw"],
        newval => {
          if (newval) {
            this.load()
          }
        }
      )
    }
  },
  methods: {
    load() {
      /* eslint-disable */
      // const crypt = new Crypt()
      const crypt = this.$crypt
      ;(async () => {
        const { data: encrypt } = await this.$axios.$get(this.src)
        this.decrypt = await this.decryptExec(encrypt)
        // this.decrypt = crypt.decrypt(encrypt, this.$store.getters["session/pw"])
        // console.log(hoge, this.decrypt)
        this.$el.dispatchEvent(new Event("load"))
      })().catch(res => {
        throw new Error(res)
      })
    },
    async decryptExec(v) {
      return await Util.webWorkerSend(new Worker, "decrypt", {
        text: v,
        pw: this.$store.getters["session/pw"]
      }, true, 0)
      .then((val) => {
        this.loadend(true)
        return val
      })
      .catch((err) => {
        this.loadend(false)
      })
    },
    loadend(success = true) {
      this.loaded = true
      this.success = success
    }
  },
  computed: {
    decryptsrc() {
      if (this.isNoimage) {
        return "noimage.png"
      } else {
        return this.decrypt ? `data:image/png;base64,${this.decrypt}` : ""
      }
    }
  }
}

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
      loaded: false
    }
  },
  mounted() {
    if (!this.src) {
      throw new Error(`${this.$el.toString()} doesnt have src prop`)
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
      // const crypt = new Crypt()
      const crypt = this.$crypt
      ;(async () => {
        const { data: encrypt } = await this.$axios.$get(this.src)
        this.decrypt = crypt.decrypt(encrypt, this.$store.getters["session/pw"])
        this.$el.dispatchEvent(new Event("load"))
      })().catch(res => {
        throw new Error(res)
      })
    },
    loadend() {
      this.loaded = true
    }
  },
  computed: {
    decryptsrc() {
      return this.decrypt ? `data:image/png;base64,${this.decrypt}` : ""
    }
  }
}

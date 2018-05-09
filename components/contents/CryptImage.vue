<style lang="scss" scoped>
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

<template>
  <img v-if="decryptsrc" :src="decryptsrc" class="img" >
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
      return this.decrypt ? `data:image/png;base64,${this.decrypt}` : ""
    }
  }
}
</script>

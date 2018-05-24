import Vue from "vue"
import Crypt from "~/assets/js/crypt.js"
import { TextDecoder, TextEncoder } from "text-encoding"
import AOut from "~/components/plugins/AOut.vue"
import VueLightbox from "vue-lightbox"

export default function(ctx, inject) {
  // crypt のグローバルインスタンス化
  const crypt = new Crypt()
  ctx.$crypt = crypt
  inject("crypt", crypt)
}

Vue.mixin({
  methods: {
    $delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }
})

Vue.component("AOut", AOut)
Vue.component("Lightbox", VueLightbox)

if (!window.TextDecoder) {
  window.TextDecoder = TextDecoder
  window.TextEncoder = TextEncoder
}

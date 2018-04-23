import Vue from "vue"
import CryptImage from "~/components/contents/CryptImage.vue"
import Crypt from "~/assets/crypt.js"

export default function(ctx, inject) {
  // crypt のグローバルインスタンス化
  const crypt = new Crypt()
  ctx.$crypt = crypt
  inject("crypt", crypt)
}

Vue.component("crypt-image", CryptImage)

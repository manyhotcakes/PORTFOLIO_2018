<style lang="scss" scoped>
.body {
  transition: height 0.4s ease-out;
}
</style>

<template>
  <section class="body">
    <div v-if="loadend" class="l-works l-imagelist">
      <squareimage v-for="(item, key) in items" :key="key"
                   :src="item.topimage"
                   :title="item.title"
                   class="l-imagelist_item"
                   @click.native="openModal(item, key)"/>
    </div>
    <loading v-if="!loadend" :color="color" :processing="loadingProcessing"/>
  </section>
</template>

<script>
import mixin from "~/components/mixin/_EncryptComponent.js"

import Squareimage from "~/components/contents/Squareimage.vue"
export default {
  name: "Works",
  components: { Squareimage },
  mixins: [mixin],
  data() {
    return {
      items: {},
      decryptFlg: true
    }
  },
  methods: {
    getTitle(key) {
      console.log(key)
    },
    openModal(item) {
      this.$store.commit("window/setModalData", {
        works: {
          contents: item,
          type: "Works",
          visible: true,
          posy: `-${this.$store.getters["window/scrollY"] + 20}px`
        }
      })
      this.$store.commit("window/setScrollStop", true)
    },
    async onFinish() {
      // 各要素にローディングしたパラメータの投入
      const whitelist = [
        "title",
        "topimage",
        "images",
        "description",
        "duration",
        "position",
        "targetdevice",
        "team",
        "charge",
        "technique",
        "site",
        "particular"
      ]
      _.forEach(this.crypts.items, (v, k) => {
        this.$set(this.items, k, _.pick(v, whitelist))
      })
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <section>
    <h1>Works</h1>
    <div class="l-works l-imagelist">
      <squareimage v-for="(item, key) in items" :key="key"
                   :src="item.topimage"
                   :title="item.title"
                   class="l-imagelist_item"
                   @click.native="openModal(item, key)"/>
    </div>
    <div v-if="isShowModal">HOGEHOGE</div>
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
      decryptFlg: false
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

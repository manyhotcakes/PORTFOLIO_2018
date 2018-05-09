<style lang="scss" scoped>
</style>

<template>
  <section>
    <h1>Works</h1>
    <div class="l-works l-imagelist">
      <squareimage v-for="(item, key) in items" :key="key"
                   :src="item.squareimage" :title="item.title"
                   class="l-imagelist_item"
                   @click.native="openModal(item)"/>
    </div>
    <div v-if="isShowModal">HOGEHOGE</div>
  </section>
</template>

<script>
/* eslint-disable */
import mixin from "~/components/mixin/_EncryptComponent.js"

import Squareimage from "~/components/contents/Squareimage.vue"
export default {
  name: "Works",
  mixins: [mixin],
  components: {Squareimage},
  data(){
    return {
      items: {
        "01": {
          title: "",
          squareimage: "data/img/ss01_01.json"
        },
        "02": {
          title: "",
          squareimage: "data/img/ss02_01.json",
        },
        "03": {
          title: "",
          squareimage: "data/img/ss03_01.json",
        },
        "04": {
          title: "",
          squareimage: "data/img/ss04_01.json",
        },
        "05": {
          title: "",
          squareimage: "data/img/ss05_01.json"
        },
      },
      decryptFlg: false
    }
  },
  methods: {
    getTitle(key) {
      console.log(key)
    },
    openModal(item){
      this.$store.commit("window/setModalData", { works: {
        contents: {
          title: item.title
        },
        type: "Works",
        visible: true,
        posy: `${this.$store.getters["window/scrollY"] + 20}px`
      }})
    },
    async onFinish() {
      // 各要素にローディングしたパラメータの投入
      _.forEach(this.crypts.items, (v, k) => {
        if (this.items[k]) {
          this.$set(this.items[k], "title", v.title)
        }
      })
      return true
    }
  },
  computed: {

  }
}
</script>

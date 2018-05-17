<style lang="scss" scoped>
</style>

<template>
  <div class="wrap">
    <lightbox :src="decryptsrc" :caption="caption" show-index="false">
      <img v-if="decryptsrc" :src="decryptsrc" class="cryptImage_img" @load="loadend" >
    </lightbox>
    <div v-if="!loaded" class="cryptImage_img cryptImage_loading">
      <i class="fas fa-spinner cryptImage_loading_icon"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import mixin from "~/components/mixin/_CryptImage.js"

export default {
  mixins: [mixin],
  props: {
    caption: {
      type: [String],
      required: true
    }
  },
}
</script>

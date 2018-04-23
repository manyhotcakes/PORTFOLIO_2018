<template>
  <section>
    <h1>Works</h1>
    <div class="l-works flex">
      <squareimage src="sample.json" />
    </div>

    <div v-html="body"/>
    <!-- <loading v-if="!body" :color="color"/> -->
  </section>
</template>

<script>
/* eslint-disable */
import mixin from "~/assets/encryptComponentMixin.js"

import Squareimage from "~/components/contents/Squareimage.vue"
export default {
  name: "Works",
  components: {Squareimage},
  mixins: [mixin]
}
</script>

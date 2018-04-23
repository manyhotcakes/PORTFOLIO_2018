<template>
  <div>
    <div v-html="body"/>
    <loading v-if="!body" :color="color"/>
  </div>
</template>

<script>
import mixin from "~/assets/encryptComponentMixin.js"

export default {
  name: "Iam",
  mixins: [mixin],
  props: {
    color: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      level: 3
    }
  }
}
</script>

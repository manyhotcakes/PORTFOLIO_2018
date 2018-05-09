<template>
  <div>
    <div v-html="crypts.body"/>
    <loading v-if="!crypts.body" :color="color"/>
  </div>
</template>

<script>
import mixin from "~/components/mixin/_EncryptComponent.js"

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

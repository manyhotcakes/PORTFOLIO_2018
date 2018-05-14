<template>
  <div>
    <div v-if="loadend" v-html="crypts.body"/>
    <loading v-if="!loadend" :color="color"/>
  </div>
</template>

<script>
import mixin from "~/components/mixin/_EncryptComponent.js"

export default {
  name: "Iam",
  mixins: [mixin],
  data: function() {
    return {
      level: 3
    }
  }
}
</script>

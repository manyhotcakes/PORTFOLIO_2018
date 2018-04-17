<template>
  <div>
    <div v-html="body"></div>
    <loading v-if="!body" :color="color"/>
  </div>
</template>

<script>
import mixin from '~/assets/encryptComponentMixin.js'

export default {
  mixins: [mixin],
  name: 'Iam',
  props: {
    color: String,
  },
  data: function(){
    return {
      level: 3,
      body: '',
    }
  },
}
</script>

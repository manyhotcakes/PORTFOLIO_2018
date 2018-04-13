<template>
  <img @load="onLoad" :src="getFilepath">
</template>

<script>
export default {
  props: {
    filepath: ''
  },
  methods: {
    getFilepath() {
      return `${this.filepath}`;
    },
    onLoad() {
      console.log('ok');
      this.$emit('loaded');
    }
  }
}
</script>

<template>
  <div>
    squareimage
    <crypt-image :src="src" />
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
}
</script>

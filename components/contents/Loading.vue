<style lang="scss" scoped>
.body {
  width: 100%;
  height: 10rem;
  position: relative;
  animation: fadeIn 0.4s ease 0s 1 normal;
}
.lineIndicator {
  width: 80%;
  height: 0.5rem;
  min-height: 6px;
  border: 1px solid white;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  &_loaded {
    height: 100%;
    background-color: white;
  }
}
</style>
<template>
  <div :class="bodyClass" class="body">
    <div class="lineIndicator">
      <div :style="indicatorLineStyle" class="lineIndicator_loaded"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    },
    processing: {
      type: Object,
      required: false,
      default: () => ({
        now: 0,
        max: 0
      })
    }
  },
  data() {
    return {
      bodyClass: []
    }
  },
  computed: {
    indicatorClass() {
      return [`colorbg-${this.color}`]
    },
    indicatorLineStyle() {
      return {
        width: `${this.processing.now / this.processing.max * 100}%`
      }
    }
  }
}
</script>

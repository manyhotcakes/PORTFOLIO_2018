<style lang="scss" scoped>
.body {
  width: 100%;
  height: 10rem;
}
.indicator {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  @include indicatorSize(4rem, 4rem);
  @each $key, $color in $colors {
    &.colorbg-#{$key} {
      @include indicatorColor(white, $color);
    }
  }
}
</style>
<template>
  <div class="body">
    <div :class="indicatorClass" class="indicator isLoading"/>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    }
  },
  computed: {
    indicatorClass: function() {
      return [`colorbg-${this.color}`]
    }
  }
}
</script>

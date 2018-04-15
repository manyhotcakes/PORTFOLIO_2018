<style lang="scss" scoped>
.indicator{
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  @include indicatorSize(4rem, 4rem)
  &.colorbg-color1{
    @include indicatorColor(white, $color1);
  }
  &.colorbg-color2{
    @include indicatorColor(white, $color2);
  }
}
</style>
<template>
  <div class="body">
    <div class="indicator isLoading" :class="indicatorClass"/>
  </div>
</template>

<script>
export default {
  props:[
    'color',
  ],
  computed: {
    indicatorClass: function() {
      return [
        `colorbg-${this.color}`,
      ];
    },
  },
  mounted(){
    console.log('mounted')
  }
}
</script>

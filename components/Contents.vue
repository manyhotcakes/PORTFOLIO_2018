<template>
  <div class="wrap" :class="wrapClass">
    <div class="block">
      <div class="slash slash-top" :class="slashClass" />
      <div class="slash slash-bottom" :class="slashClass" />
      <div class="box" :class="boxClass">
        <div class="body">
          {{scrollY}}
        hogehoge<br>
        hogehoge<br>
        hogehoge<br>
        hogehoge<br>
        hogehoge<br>
        hogehoge<br>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// variables

// styles
.wrap{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  overflow: hidden;
  transition:
    opacity 0.4s linear,
    margin 0.4s ease-out;
  &.isHide{
    opacity: 0;
    margin-top: 200px;
  }
}

.slash{
  position: absolute;
  width: 150vw;
  height: calc(100vw * 0.22169466264294);
  z-index: 1;
}
.slash-rightup{
  transform-origin: bottom left;
  left: 0;
  transform: rotateZ(-12.5deg);
}
.slash-leftup{
  transform-origin: bottom right;
  right: 0;
  transform: rotateZ(12.5deg);
}
.slash-top{
  top: calc(100vw * 0.22169466264294);
}
.slash-bottom{
  bottom: 0;
}

.block{
  position: relative;
  width: 100vw;
  box-sizing: border-box;
  padding: calc(100vw * 0.22169466264294) 0;
  margin: 1vw 0;
}
.box{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}
.body{
  z-index: 2;
  font-size: 1rem;
  width: 80%;
}
</style>

<script>
import _ from 'lodash';
import axios from 'axios'
const userid = 'manyhotcakes'

export default {
  props: {
    slashType: String,
    color: String,
  },
  data: function() {
    return {
      scrollX: 0,
      scrollY: 0,
    }
  },
  mounted: function() {
    this.scrollY = this.$el.offsetTop + this.$el.clientHeight/2;
  },
  computed: {
    wrapClass: function() {
      const res = [];
      if (this.scrollY > this.$store.getters.scrollYBottom){
        res.push('isHide');
      }
      return res;
    },
    slashClass: function() {
      return [
        `slash-${this.slashType}`,
        `colorbg-${this.color}`,
      ];
    },
    boxClass: function() {
      return [
        `colorbg-${this.color}`,
      ];
    },
  }
}
</script>

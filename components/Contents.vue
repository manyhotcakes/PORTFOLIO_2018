<template>
  <div class="wrap">
    <div class="contents">
      <div class="outer outer-top" />
      <div class="outer outer-bottom" />
      <div class="box">
        <div class="body">
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
}

.outer{
  position: absolute;
  width: 150vw;
  background-color: blue;
  height: calc(100vw * 0.22169466264294);
  transform: rotateZ(-12.5deg);
  z-index: 1;
}
.outer-top{
  transform-origin: bottom left;
  top: calc(100vw * 0.22169466264294);
}
.outer-bottom{
  transform-origin: bottom left;
  bottom: 0;
}

.contents{
  position: relative;
  width: 100vw;
  box-sizing: border-box;
  padding: calc(100vw * 0.22169466264294) 0;
  margin: 1vw 0;
}
.box{
  position: relative;
  background-color: blue;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}
.body{
  // position: absolute;
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
  data: function() {
    return {
    }
  },
  mounted: function() {
  },
  methods: {

  }
}
</script>

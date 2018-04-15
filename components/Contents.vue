<template>
  <div class="wrap" :class="wrapClass">
    <div class="block">
      <div class="slash slash-top" :class="slashClass" />
      <div class="slash slash-bottom" :class="slashClass" />
      <div class="box" :class="boxClass">
        <keep-alive>
          <component v-on:authentication="onAuthentication" :is="contentsType" :color="color" :errormsg="errormsg" class="body"/>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// variables
$deg: 12.5deg;
$tan: 0.22169466264294;
$cos: 0.97629600711993;
// styles
.wrap{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  overflow: hidden;
  opacity: 0;
  transform: translateY(25vh);
  transition:
    opacity 0.4s linear,
    transform 0.4s ease-out;
  &.isShow{
    opacity: 1;
    transform: translateY(0);
  }
}
.wrap-rightup{
}
.wrap-leftup{
}

.error{
  color: red;
}

.slash{
  position: absolute;
  width: 150vw;
  height: calc(100vw * #{$tan});
  z-index: 1;
}
.slash-rightup{
  transform-origin: bottom left;
  left: 0;
  transform: rotateZ(-#{$deg});
}
.slash-leftup{
  transform-origin: bottom right;
  right: 0;
  transform: rotateZ(#{$deg});
}
.slash-top{
  top: calc(100vw * #{$tan});
}
.slash-bottom{
  bottom: 0;
}

.block{
  position: relative;
  width: 100vw;
  box-sizing: border-box;
  padding: calc(100vw * #{$tan}) 0;
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
  height: auto;
  transition: height 0.4s ease-out,
}
</style>

<script>
import _ from 'lodash';
import axios from 'axios';
const userid = 'manyhotcakes';

// import Iam from '~/components/contents/Iam.vue';
import Histories from '~/components/contents/Histories.vue';
import Lock from '~/components/contents/Lock.vue';
import Loading from '~/components/contents/Loading.vue';

// function hoge(){
//   // return new Promise((resolve) => {
//   //   setTimeout(async ()=>{
//   //     resolve( await import('~/components/contents/Iam.vue') );
//   //     // resolve(rs);
//   //   }, 4000);
//   // });
//   return import('~/components/contents/Iam.vue').then((val) => {
//     console.log('task1')
//     return new Promise((resolve) => {
//       resolve(val);
//     });
//   })
// }

export default {
  // errorCaptured (err, vm, info){
  //   this.error = `${err.stack}\n\nfound in ${info} of component`;
  //   console.error(this.error);
  //   this.contentsType = "Lock";
  //   this.errormsg = "ロードに失敗しました"
  //   return false;
  // },

  components: {
    // Iam: () => new Promise(() => {
    //
    // }),
    Iam: () => ({
      component: import('~/components/contents/Iam.vue'),
      loading: Loading,
      error: Lock,
    }),
    Histories,
    Lock,
  },
  props: {
    slashType: String,
    color: String,
    contentsType: String,
  },
  data: function() {
    return {
      scrollX: 0,
      scrollY: 0,
      error: null,
      errormsg: false,
    }
  },
  mounted: function() {
    this.$root.$on('windowresize', this.onResize);
    console.log(this.component);
  },
  computed: {
    wrapClass: function() {
      const res = [`wrap-${this.slashType}`];
      if (this.scrollY < this.$store.getters['window/scrollYBottom']){
        res.push('isShow');
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
  },
  methods: {
    onResize() {
      this.scrollY = this.$el.offsetTop + (this.$store.getters['window/windowH'] * 0.25);
    },
    onAuthentication(val) {
      // setTimeout(() => {
      //   console.log(this)
        this.contentsType = "Iam";
      // }, 2000);
    }
  }
}
</script>

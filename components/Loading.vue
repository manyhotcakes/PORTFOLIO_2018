<template>
  <div class="wrap">
    <div class="block">
      <div class="graphic" v-on:animationend="transitionend" v-on:transitionend="transitionend">
        <div class="indicator" :class="stateClass" ></div>
        <div class="image" :style="{backgroundImage: imageContents}" :class="stateClass"/>
        <div class="effect" :class="stateClass">
          <div class="effect_visual" :class="stateClass"></div>
        </div>
      </div>
      <div class="title title-1" :class="stateClass">
        <div class="title_contents title-1_contents" v-text="textContents">&nbsp;</div>
      </div>
      <div class="title title-2" :class="stateClass">
        <div class="title_contents title-2_contents">Portfolio</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// variables
$loading-sec: .8s;
$loadendscale-sec: .4s;
$indicator-size: 5rem;

// styles
.wrap{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}
.graphic{
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}
.indicator{
  width: $indicator-size;
  height: $indicator-size;
  position: absolute;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  // states
  &.isLoading{
    border-radius: 50%;
    background: linear-gradient(to right, $logo-color 10%, rgba($background-color, 0) 50%);
    animation: loading-indicator $loading-sec infinite linear;
    opacity: 1.0;
    transition:
      height $loadendscale-sec linear,
      width $loadendscale-sec linear,
      opacity $loadendscale-sec linear;
    // pseudo
    &:before{
      content: "";
      background: $logo-color;
      display: block;
      border-radius: 100% 0 0 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 50%;
    }
    &:after{
      position: absolute;
      content: "";
      background: $background-color;
      display: block;
      border-radius: 100%;
      width: 80%;
      height: 80%;
    }
    // with state
    &.isEnd{
      width: 0px;
      height: 0px;
      opacity: 0.0;
    }
  }
  &.isLoaded, &.isFinish {
    display: none;
  }
}
.effect{
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: $indicator-size*4;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // text-align: center;
  // flex-direction: column;
  &.isFinish {
    display: none;
  }
}
.effect_visual{
  box-sizing: content-box;
  z-index: -1;
  border-radius: 50%;
  width: $indicator-size;
  height: $indicator-size;
  border: $logo-color solid 0.3rem;
  box-sizing: border-box;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &.isLoading{
    visibility: hidden;
  }
  &.isLoaded {
    animation: loaded-effect_visual $loadendscale-sec*3 ease-out forwards;
  }
  &.isFinish {
    display: none;
  }
}
.title{
  position: relative;
  width: 100%;
  overflow: hidden;
  transition:
    width $loadendscale-sec linear $loadendscale-sec*1.5;
  &.isLoading{
    visibility: hidden;
    width: 0;
  }
  &.isLoaded{
    width: 100%;
  }
}
.title-2{
  transition:
    width $loadendscale-sec linear $loadendscale-sec*2.5;
}
.title_contents{
  white-space: nowrap;
  font-family: 'Raleway', sans-serif;
  text-align: center;
  width: 100vw;
}
.title-1{
  &_contents{
    font-size: 3.5rem;
    line-height: 3.5rem;
    color: $title1-color;
  }
}
.title-2{
  &_contents{
    font-size: 2.5rem;
    line-height: 2.5rem;
    color: $title2-color;
  }
}

.image{
  background-position: center;
  border-radius: 50%;
  background-size: 100%;
  // background-size: $indicator-size;
  &.isLoading{
    width: 0;
    height: 0;
  }
  &.isLoaded {
    width: $indicator-size;
    height: $indicator-size;
    transition:
      height $loadendscale-sec ease-in,
      width $loadendscale-sec ease-in;
  }
  &.isFinish {
    width: $indicator-size;
    height: $indicator-size;
  }
}

@keyframes loading-indicator{
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes loaded-effect_visual{
  0% {
    border-color: rgba($logo-color, 0.0);
    transform: scale(0.0);
  }
  50% {
    border-color: rgba($logo-color, 1.0);
  }
  100% {
    border-color: rgba($logo-color, 0.0);
    transform: scale(4.0);
  }
}
</style>

<script>
import _ from 'lodash';
import axios from 'axios'
const userid = 'manyhotcakes'

export default {
  data: function() {
    return {
      stateClass: ['isLoading'],
      textContents: ' ',
      imageContents: ''
    }
  },
  mounted: function() {
    const initActions = [
      // GitHub からアイコン取得
      (async () => {
        const { data: user } = await axios.get(`https://api.github.com/users/${userid}`)
        this.textContents = user.name;
        this.imageContents = `url(${user.avatar_url})`;
      })(),
      // データ取得
      (async () => {
        const {data} = await axios.get(`${process.env.JSONDATAPATH}dummy.json`)
        console.log (data);
      })(),
      // 処理が早く終わりすぎたときのための wait
      (async () => {
        return new Promise(function(resolve, reject) {
          setTimeout(resolve, 1000, 'foo');
        });
      })()
    ];
    (async () => {
      const result = await Promise.all(initActions);
      this.loadingEndStart()
    })();
  },
  methods: {
    loadingEndStart() {
      this.stateClass.push('isEnd');
      this.stateClass = _.uniq(this.stateClass);
    },
    transitionend(evt) {
      if (_.includes(this.stateClass, 'isLoading')
        && _.includes(_.toArray(evt.target.classList), 'indicator')
        && _.toLower(evt.propertyName) === 'width'){
        // LoadingEnd
        this.stateClass = ['isLoaded']
      } else if (_.includes(this.stateClass, 'isLoaded')
        && _.includes(_.toArray(evt.target.classList), 'effect_visual') ) {
        this.stateClass = ['isFinish']
      }
    },
  }
}
</script>

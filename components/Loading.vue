<template>
  <div class="wrap" :class="stateClass">
    <div class="performance" v-on:click="loadingEndStart" v-on:transitionend="loaded" :class="stateClass" >
      <img class="performance_img" :src="logoImageContents"/>
      <div class="performance_effect">
      </div>
    </div>
    <p class="performance_text" v-bind:class="logoTextClass" v-text="logoTextContents"></p>
  </div>
</template>

<style lang="scss">
// variables
$loading-sec: .8s;
$loadendscale-sec: .4s;

// styles
.wrap{
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}
.performance{
  width: 200px;
  height: 200px;
  position: relative;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  &_effect{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    border-radius: 50%;
    border: $logo-color solid 20px;
  }
  &_text{
    text-align: center;
    position: absolute;
    font-family: 'Raleway', sans-serif;
    font-size: 10rem;
    line-height: 100px;
    white-space: nowrap;
  }
}
// states
.isLoading{
  .performance {
    border-radius: 50%;
    background: linear-gradient(to right, $logo-color 10%, rgba($background-color, 0) 50%);
    animation: loading-performance $loading-sec infinite linear;
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
  .performance_img, .performance_text{
    display: none;
  }
  .performance_effect{
    transform: scale(0.0);
  }
}
.isLoaded{
  .performance {
    background-size: contain;
    transition:
      height $loadendscale-sec ease-in,
      width $loadendscale-sec ease-in;
  }
  .performance_img{
    width: 100%;
    border-radius: 50%;
  }
  .performance_effect{
    animation: loaded-performance_effect $loadendscale-sec*3 ease-out forwards;
  }
}

@keyframes loading-performance{
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes loaded-performance_effect{
  0% {
    border-color: rgba($logo-color, 0.0);
    transform: scale(0);
  }
  50% {
    border-color: rgba($logo-color, 1.0);
  }
  100% {
    border-color: rgba($logo-color, 0.0);
    transform: scale(4);
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
      logoTextClass: ['loadedText'],
      logoTextContents: '',
      logoImageContents: ''
    }
  },
  mounted: function() {
    const initActions = [
      // GitHub からアイコン取得
      (async () => {
        const { data: user } = await axios.get(`https://api.github.com/users/${userid}`)
        console.log(user);
        this.logoTextContents = user.name;
        this.logoImageContents = user.avatar_url;
      })(),
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
    loaded(evt) {
      if (_.includes(this.stateClass, 'isLoading') && _.toLower(evt.propertyName) === 'width'){
        // LoadingEnd
        this.stateClass = ['isLoaded', 'start']
        console.log('loading end');
      } else if (_.includes(this.stateClass, 'isLoaded') ) {
      }
    },
  }
}
</script>

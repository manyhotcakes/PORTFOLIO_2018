<template>
  <div class="wrap">
    <div>
      <div class="wrap_graphic" @animationend="transitionend" @transitionend="transitionend">
        <div :class="stateClass" class="indicator" />
        <div :style="{backgroundImage: imageContents}" :class="stateClass" class="image"/>
        <div :class="stateClass" class="effect">
          <div :class="stateClass" class="effect_visual"/>
        </div>
      </div>
      <div :class="stateClass" class="wrap_title title title-1">
        <div class="title_contents title-1_contents" v-text="textContents">&nbsp;</div>
      </div>
      <div :class="stateClass" class="wrap_title title title-2">
        <div class="title_contents title-2_contents">Portfolio</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// variables
$loading-sec: 0.8s;
$loadendscale-sec: 0.4s;
$indicator-size: 5rem;

// styles
/* ===================
 * 親クラス
 =================== */
.wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}
/* ===================
 * 演出表現親クラス
 =================== */
.wrap_graphic {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}
/* ===================
 * ローディングインジケーター
 =================== */
.indicator {
  @include indicatorColor($color1);
}
/* ===================
 * にぎやかし
 =================== */
.effect {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: $indicator-size * 4;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // text-align: center;
  // flex-direction: column;
  &.isFinish {
    display: none;
  }
}
.effect_visual {
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
  &.isLoading {
    visibility: hidden;
  }
  &.isLoaded {
    animation: loaded-effect_visual $loadendscale-sec * 3 ease-out forwards;
  }
  &.isFinish {
    display: none;
  }
}
/* ===================
 * タイトルテキスト
 =================== */
.title {
  position: relative;
  width: 100%;
  overflow: hidden;
  transition: width $loadendscale-sec linear $loadendscale-sec * 1.5;
  &.isLoading {
    visibility: hidden;
    width: 0;
  }
  &.isLoaded {
    width: 100%;
  }
}
.title-2 {
  transition: width $loadendscale-sec linear $loadendscale-sec * 2.5;
}
.title_contents {
  white-space: nowrap;
  font-family: "Raleway", sans-serif;
  text-align: center;
  width: 100vw;
}
.title-1 {
  &_contents {
    font-size: 3.5rem;
    line-height: 3.5rem;
    color: $title1-color;
  }
}
.title-2 {
  &_contents {
    font-size: 2.5rem;
    line-height: 2.5rem;
    color: $title2-color;
  }
}
/* ===================
 * GitHubアイコンを表示する画像枠
 =================== */
.image {
  background-position: center;
  border-radius: 50%;
  background-size: 100%;
  // background-size: $indicator-size;
  &.isLoading {
    width: 0;
    height: 0;
  }
  &.isLoaded {
    width: $indicator-size;
    height: $indicator-size;
    transition: height $loadendscale-sec ease-in,
      width $loadendscale-sec ease-in;
  }
  &.isFinish {
    width: $indicator-size;
    height: $indicator-size;
  }
}
/* ===================
 * ローディングインジケーターアニメ用
 =================== */
@keyframes loading-indicator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* ===================
 * 読み込み完了後にぎやかしアニメ用
 =================== */
@keyframes loaded-effect_visual {
  0% {
    border-color: rgba($logo-color, 0);
    transform: scale(0);
  }
  50% {
    border-color: rgba($logo-color, 1);
  }
  100% {
    border-color: rgba($logo-color, 0);
    transform: scale(4);
  }
}
</style>

<script>
import _ from "lodash"
import axios from "axios"
const TIMEOUT = 1000 //5000; TODO 戻す

export default {
  data: function() {
    return {
      // ローディング状態を表すクラス。
      // isLoading -> isLoaded -> isFinish で遷移
      stateClass: ["isLoading"],
      // タイトルテキスト
      textContents: " ",
      // 表示画像パス
      imageContents: ""
    }
  },
  mounted: function() {
    // 初期化処理で非同期に処理完了を待つタスク一覧
    const initTasks = [
      // GitHub からアイコン取得
      (async () => {
        const { data: user } = await axios.get(
          `https://api.github.com/users/${process.env.GITHUBUSERID}`
        )
        this.textContents = user.name
        this.imageContents = `url(${user.avatar_url})`
      })(),
      // HTML中のpreload指定された画像の読み込み完了待ち
      (async () => {
        return new Promise(resolve => {
          this.$watch(() => this.$store.getters["preload/isFinish"], function(
            newval
          ) {
            if (newval) {
              resolve()
              console.log("img loaded")
            }
          })
          // 時間切れ
          setTimeout(() => {
            resolve()
          }, TIMEOUT)
        })
      })(),
      // 処理が早く終わりすぎたときのための wait
      (async () => {
        return new Promise(function(resolve) {
          setTimeout(resolve, 1000, "foo")
          console.log("settimeout loaded")
        })
      })()
    ]

    return (async () => {
      // 上記のタスクがすべて完了したタイミングで、ロード表現の終了
      await Promise.all(initTasks)
      this.stateClass.push("isEnd")
      this.stateClass = _.uniq(this.stateClass)
    })().catch(res => {
      // 仮に失敗した場合は、画面を破棄してエラーを投げる
      this.$el.remove()
      this.$destroy(true)
      throw new Error(res)
    })
  },
  methods: {
    /**
     * CSS の transition や animation の終了監視
     * @param  {Event} evt [description]
     * @return {[type]}     [description]
     */
    transitionend(evt) {
      if (
        _.includes(this.stateClass, "isLoading") &&
        _.includes(_.toArray(evt.target.classList), "indicator") &&
        _.toLower(evt.propertyName) === "width"
      ) {
        // LoadingEnd
        this.stateClass = ["isLoaded"]
      } else if (
        _.includes(this.stateClass, "isLoaded") &&
        _.includes(_.toArray(evt.target.classList), "effect_visual")
      ) {
        this.stateClass = ["isFinish"]
        // store に保存
        this.$store.commit("preload/finish")
      }
    }
  }
}
</script>

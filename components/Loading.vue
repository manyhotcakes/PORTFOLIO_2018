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
  font-family: Raleway;
  position: relative;
  width: 100%;
  overflow: hidden;
}
.title_contents {
  white-space: nowrap;
  text-align: center;
  width: 100vw;
  height: 4rem;
  &_char {
    opacity: 0;
    @for $key from 0 through 30 {
      &-#{$key} {
        animation: fadeIn 0.4s ease-in ($key * 0.1s) forwards;
      }
    }
  }
}
.title-1 {
  &_contents {
    font-size: 3.5rem;
    line-height: 3.5rem;
    color: $title1-color;
    @include smartphones() {
      font-size: 11vw;
    }
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
 * 背景動画
 =================== */
.background {
  position: absolute;
  left: 0;
  top: 0;
  // width: 100%;
  height: calc(100vh + 100vw * #{$slashtan} + 20px);
  // animation: fadeIn 1s ease 0s 1 normal;
  z-index: -10;
  opacity: 0.3;
  &.isFadeInOut {
    animation: backgroundfadeInOut 5s ease-in-out 0s 1 normal;
  }
  &.isFadeIn {
    animation: backgroundfadeIn 3s ease-in 0s 1 normal;
  }
  &.isHide {
    height: 0;
    visibility: hidden;
  }
  @keyframes backgroundfadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.3;
    }
  }

  @keyframes backgroundfadeInOut {
    0% {
      opacity: 0.3;
    }
    30% {
      opacity: 0;
    }
    100% {
      opacity: 0.3;
    }
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
/* ===================
 * スクロール示唆
 =================== */
.l-scrollarrow {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
}
.scrollarrow {
  color: rgba(#000, 0.4);
  z-indx: 10;
  opacity: 0;
  animation: fadeIn 1s ease-in 1s 1 normal forwards;
  &_icon {
    font-size: 5rem;
    animation: arrow-effect 2s ease-out 1s infinite;
  }
  &.isHide {
    animation: fadeOut 0.4s ease-in 0s 1 normal forwards;
  }
  @keyframes arrow-effect {
    0% {
      opacity: 0;
      transform: translateY(-2rem);
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(0%);
    }
  }
}
</style>
<template>
  <div class="wrap">
    <div class="wrap_graphic" @animationend="transitionend" @transitionend="transitionend">
      <div :class="stateClass" class="indicator" />
      <div :style="{backgroundImage: imageContents}" :class="stateClass" class="image"/>
      <div :class="stateClass" class="effect">
        <div :class="stateClass" class="effect_visual"/>
      </div>
    </div>
    <div class="wrap_title title title-1">
      <div class="title_contents title-1_contents">
        <span v-for="(v,k) in textContents" :key="k" :class="titleContentsChars[k]" v-text="v"/>
      </div>
    </div>
    <div class="wrap_title title title-2">
      <div class="title_contents title-2_contents">
        <span v-for="(v,k) in textContents2" :key="k" :class="titleContentsChars[k+10]" v-text="v" />
      </div>
    </div>
    <div>
      <video id="bgvideo" :class="backgroundClass" src="bgvideo.mp4" poster="3x2_blank.png" preload="auto" loop muted class="background"/>
    </div>
    <div v-if="isFinish" :class="arrowClass" class="l-scrollarrow scrollarrow">
      <i class="scrollarrow_icon fas fa-angle-double-down"/>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import webfontloader from "webfontloader"
const TIMEOUT = 1000 //5000; TODO 戻す

export default {
  data: function() {
    return {
      // ローディング状態を表すクラス。
      // isLoading -> isLoaded -> isFinish で遷移
      stateClass: ["isLoading"],
      // タイトルテキスト
      textContents: "",
      textContents2: "",
      // 表示画像パス
      imageContents: "",
      // 背景ビデオ用
      backgroundClass: "isHide",
      // スクロール矢印用
      arrowClass: "",
      // Githubのユーザ情報
      userinfo: null
    }
  },
  computed: {
    ...mapGetters({
      scrollY: "window/scrollY"
    }),
    isFinish() {
      return _.includes(this.stateClass, "isFinish")
    },
    isLoaded() {
      return _.includes(this.stateClass, "isLoaded")
    },
    titleContentsChars() {
      console.log(this.isLoaded || this.isFinish, "titleContentsChars")
      return this.isLoaded || this.isFinish
        ? Array.from(Array(30).keys()).map(v => [
            "title_contents_char",
            `title_contents_char-${v}`
          ])
        : Array.from(Array(30).keys()).map(() => "title_contents_char")
    }
  },
  watch: {
    scrollY() {
      if (!this.arrowClass && this.scrollY > 0) {
        this.arrowClass = "isHide"
      }
    }
  },
  mounted: function() {
    // 動画のループ再生（自前）
    const video = document.getElementById("bgvideo")
    video.addEventListener("timeupdate", event => {
      const { currentTime } = event.target
      if (currentTime > 5) {
        this.backgroundClass = ""
      }
      if (currentTime > 8.5) {
        this.backgroundClass = "isFadeInOut"
      }
      // 動画がハレーション起こす映像になったタイミングでずらす。
      // 同時にこのタイミングでは CSS animation で opacity 0 になっている
      if (currentTime > 9.5) {
        event.target.currentTime = 0.5
      }
    })

    // 初期化処理で非同期に処理完了を待つタスク一覧
    const initTasks = [
      // GitHub からアイコン取得
      (async () => {
        this.userinfo = await this.$axios.$get(
          `https://api.github.com/users/${process.env.GITHUBUSERID}`
        )
        const { name, avatar_url } = this.userinfo
        const sub = "Portfolio"
        this.textContents = name
        this.textContents2 = sub
        this.imageContents = `url(${avatar_url})`
        await this.$axios.$get(avatar_url)
      })(),
      // HTML中のpreload指定された画像の読み込み完了待ち
      (() => {
        return new Promise(resolve => {
          this.$watch(() => this.$store.getters["preload/isFinish"], function(
            newval
          ) {
            if (newval) {
              resolve()
            }
          })
          // 時間切れ
          setTimeout(() => {
            resolve()
          }, TIMEOUT)
        })
      })(),
      // フォントファイルの読み込み完了待ち
      (() => {
        return new Promise(resolve => {
          webfontloader.load({
            google: {
              families: ["Rounded Mplus 1c", "Raleway"]
            },
            active: function() {
              console.log("web font active")
              resolve()
            }
          })
        })
      })(),
      // 背景動画の読み込み完了もしくはエラー待ち
      (() => {
        return new Promise(resolve => {
          video.addEventListener("loadeddata", resolve)
          video.addEventListener("error", resolve)
        })
      })(),
      // 処理が早く終わりすぎたときのための wait
      (() => {
        return new Promise(function(resolve) {
          setTimeout(resolve, 1000, "foo")
          console.log("settimeout loaded")
        })
      })()
    ]

    return (async () => {
      // 上記のタスクがすべて完了したタイミングで、ロード表現の終了
      await Promise.all(initTasks) //TODO コメント解除
      // Promise.all(initTasks) //TODO 削除
      // this.$store.commit("preload/finish") //TODO 削除
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
        // this.titleTypeStart()
      } else if (
        _.includes(this.stateClass, "isLoaded") &&
        _.includes(_.toArray(evt.target.classList), "effect_visual")
      ) {
        this.stateClass = ["isFinish"]
        // store に保存
        this.$store.commit("preload/finish")
        this.backgroundClass = "isFadeIn"
        this.$nextTick(() => {
          const video = document.getElementById("bgvideo")
          video.currentTime = 0.1
          video.playbackRate = 0.75
          document.getElementById("bgvideo").play()
        })
      }
    },
    titleTypeStart() {
      const { name } = this.userinfo
      const sub = "Portfolio"
      let idx = 1

      const interval = setInterval(() => {
        let idx2 = idx - name.length
        if (idx <= name.length) {
          this.textContents = name.substring(0, idx)
        } else if (idx2 <= sub.length) {
          this.textContents2 = sub.substring(0, idx2)
        } else {
          clearInterval(interval)
        }
        idx++
      }, 50)
    }
  }
}
</script>

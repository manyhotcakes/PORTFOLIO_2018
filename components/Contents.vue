<template>
  <div :class="wrapClass" class="wrap" >
    <div class="block">
      <div :class="slashClass" class="slash slash-top" />
      <div :class="slashClass" class="slash slash-bottom" />
      <div :class="boxClass" class="box" >
        <div class="l-box_in">
          <h1 v-if="contentsTitle" class="title" v-text="contentsTitle"/>
          <component :is="currentContentsComponent"
                     :color="color"
                     class="body"
                     @authentication="onAuthentication"/>
        </div>
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
.wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.4s linear;
  &.isShow {
    opacity: 1;
  }
}
.wrap-rightup {
}
.wrap-leftup {
}

.error {
  color: red;
}

.slash {
  position: absolute;
  width: 150vw;
  height: calc(100vw * #{$tan});
  z-index: 1;
}
.slash-rightup {
  transform-origin: bottom left;
  left: 0;
  transform: rotateZ(-#{$deg});
}
.slash-leftup {
  transform-origin: bottom right;
  right: 0;
  transform: rotateZ(#{$deg});
}
.slash-top {
  top: calc(100vw * #{$tan});
}
.slash-bottom {
  bottom: 0;
}

.block {
  position: relative;
  width: 100vw;
  box-sizing: border-box;
  padding: calc(100vw * #{$tan}) 0;
  margin: 1vw 0;
}
.box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  z-index: 2;
}
.l-box_in {
  max-width: $sz-contents-width;
  width: 80%;
  margin: auto;
}
.body {
  font-size: 1rem;
  height: auto;
  transition: height 0.4s ease-out;
  position: relative;
  margin: auto;
}
.title {
  text-align: left;
}
</style>

<script>
import Histories from "~/components/contents/Histories.vue"
import Lock from "~/components/contents/Lock.vue"
export default {
  // TODO 開発終了後に戻す
  // errorCaptured (err, vm, info){
  //   this.error = `${err.stack}\n\nfound in ${info} of component`;
  //   console.error(this.error);
  //   this.contentsType = "Lock";
  //   this.errormsg = "ロードに失敗しました"
  //   return false;
  // },

  components: {
    Profile: () => import("~/components/contents/Profile.vue"),
    About: () => import("~/components/contents/About.vue"),
    Works: () => import("~/components/contents/Works.vue"),
    Histories,
    Lock
  },
  props: {
    slashType: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    contentsType: {
      type: [String, Array],
      default: "",
      required: true
    },
    contentsTitle: {
      type: String,
      default: "",
      required: false
    }
  },
  data: function() {
    return {
      scrollX: 0,
      scrollY: 0,
      error: null,
      errormsg: false,
      contentsTypeIdx: 0,
      api: null
    }
  },
  computed: {
    wrapClass() {
      const res = [`wrap-${this.slashType}`]
      // if (this.scrollY < this.$store.getters["window/scrollYBottom"]) {
      res.push("isShow")
      // }
      return res
    },
    slashClass() {
      return [`slash-${this.slashType}`, `colorbg-${this.color}`]
    },
    boxClass() {
      return [`colorbg-${this.color}`]
    },
    currentContentsComponent() {
      return this.getComponetsType(this.contentsTypeIdx)
    }
  },
  mounted: function() {
    this.$root.$on("windowresize", this.onResize)
  },
  methods: {
    onResize() {
      this.scrollY =
        this.$el.offsetTop + this.$store.getters["window/windowH"] * 0.25
    },
    onAuthentication(_session) {
      this.contentsTypeIdx = this.getComponetsType(this.contentsTypeIdx + 1)
        ? this.contentsTypeIdx + 1
        : this.contentsTypeIdx
      this.$store.commit("session/pw", _session.password)
    },
    getComponetsType(idx) {
      let res
      switch (typeof this.contentsType) {
        case "string":
          res = this.contentsType
          break
        default:
          res = this.contentsType[idx]
          break
      }
      return res ? res : ""
    }
  }
}
</script>

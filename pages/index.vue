<template>
  <section :class="containerClass" :style="containerStyle" class="container">
    <div v-if="isAllLoaded" class="version" v-html="version"/>
    <div>
      <!-- ページアクセス時のローディング表現用コンポーネント -->
      <loading/>
      <div v-if="isAllLoaded">
        <!-- コンテンツ:実績 -->
        <contents
          :contents-type="['Lock','Works']"
          class="js-preload l-contents"
          contents-title="Works"
          slash-type="leftup" color="color1"/>
        <!-- コンテンツ:自己紹介 -->
        <contents
          contents-type="Profile"
          class="js-preload l-contents l-contents-overwrap"
          contents-title="Profile"
          slash-type="rightup" color="color3"/>
        <!-- コンテンツ:スキル -->
        <contents
          contents-type="Skill"
          class="js-preload l-contents l-contents-overwrap"
          contents-title="My Skill"
          slash-type="leftup" color="color2"/>
        <!-- コンテンツ:サイト紹介 -->
        <contents
          contents-type="About"
          class="js-preload l-contents l-contents-overwrap"
          contents-title="About this site"
          slash-type="rightup" color="color4"/>
        <footer class="l-fooer footer">
          <span>© 2018 OkamotoTakuya</span>
          <a-out href="https://github.com/manyhotcakes"><img class="footer_giticon" src="~/static/GitHub-Mark-32px.png"></a-out>
        </footer>
      </div>
    </div>
    <modal content-key="works"/>
  </section>
</template>

<style lang="scss" scoped>
.container {
  min-height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow-x: hidden;
  // perspective: 300px;
  box-sizing: border-box;
  position: relative;
  &.isScrollStop {
    position: fixed;
    top: 0;
    overflow: hidden;
  }
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.l-contents {
  // margin-top: 0;
  z-index: 0;
  position: relative;
  &-overwrap {
    margin-top: -5rem;
    z-index: 1;
  }
}
.l-fooer {
  padding-bottom: 1rem;
}
.footer {
  color: $footer-color;
  vertical-align: middle;
  &_giticon {
    padding: 0 0.2rem;
    height: 1.2rem;
    vertical-align: middle;
  }
}
.version {
  position: absolute;
  top: 0;
  left: 0;
  color: rgba(#000, 0.3);
  font-size: 0.7rem;
  padding: 0.3rem;
  animation: fadeIn 2s ease 0s 1 normal;
}
</style>

<script>
import { mapGetters } from "vuex"
import Loading from "~/components/Loading.vue"
import Contents from "~/components/Contents.vue"
import Modal from "~/components/Modal.vue"

const THROTTLE_TIME = 250
console.log("Process:", process.env.NODE_ENV)
export default {
  components: {
    // ページアクセス時のローディング表現用コンポーネント
    Loading,
    // コンテンツ用コンポーネント
    Contents,
    Modal
  },
  data() {
    return {
      scrollY: 0
    }
  },
  computed: {
    ...mapGetters({
      isScrollStop: "window/isScrollStop",
      isAllLoaded: "preload/isFinish"
    }),
    // isAllLoaded() {
    //   return this.$store.getters["preload/isFinish"]
    // },
    containerClass() {
      const res = []
      if (this.isAllLoaded) {
        res.push("isLoaded")
      }
      if (this.isScrollStop) {
        res.push("isScrollStop")
      }
      return res
    },
    containerStyle() {
      const res = []
      if (this.isScrollStop) {
        res.push({ top: `-${this.scrollY}px` })
      }
      return res
    },
    version() {
      return process.env.PORTFOLIO_VERSION
    }
  },
  watch: {
    isScrollStop(val) {
      if (val) {
        this.scrollY = this.$store.getters["window/scrollY"]
      } else {
        this.$nextTick(() => {
          window.scrollTo(0, this.scrollY)
        })
      }
    },
    /**
     * ルーティングが変更あった際に呼び出されるメソッド
     * @param  {[type]} to   変更後
     * @param  {[type]} from 変更前
     */
    $route(to, from) {
      const prefix = process.env.MODALPAGEHASH_PREFIX
      // Android などでは戻るキーでmodalを閉じようとしてしまいがち。
      // モーダルを開いているところであれば、モーダルを閉じる
      if (to.name === from.name && from.hash.indexOf(prefix) === 0) {
        // 職歴モーダルの close
        const target = from.hash.substring(prefix.length).toLowerCase()
        this.$store.commit("window/setModalData", {
          [target]: { visible: false }
        })
        this.$store.commit("window/setScrollStop", false)
        this.$router.replace(to.fullPath.replace(to.hash, ""))
        // 画像モーダルの close
        const lightbox = document.getElementById("vue-lightbox")
        if (
          lightbox &&
          getComputedStyle(lightbox).display.toLowerCase() !== "none"
        ) {
          lightbox
            .querySelector(".lb-close")
            .dispatchEvent(new MouseEvent("click"))
        }
      }
    }
  },

  // TODO 開発後戻す
  // errorCaptured (err, vm, info){
  //   alert('ページのロードに失敗しました')
  //   return false;
  // },

  beforeMount() {
    // スクロール量を state に保存するように
    window.addEventListener("scroll", this.onScroll())
    window.addEventListener("resize", this.onResize())
    window.addEventListener("load", this.onLoad())
  },
  beforeDestroy() {
    // beforeMount で登録したイベントリスナーを解除
    window.removeEventListener("scroll", this.onScroll())
    window.removeEventListener("resize", this.onResize())
    window.removeEventListener("load", this.onLoad())
  },
  methods: {
    onScroll() {
      return _.throttle(() => {
        this.$store.commit("window/scrollUpdate")
        this.$root.$emit("windowscroll")
      }, THROTTLE_TIME)
    },
    onResize() {
      return _.throttle(() => {
        this.$store.commit("window/sizeUpdate")
        this.$root.$emit("windowresize")
      }, THROTTLE_TIME)
    },
    onLoad() {
      return () => {
        this.onScroll()
        this.onResize()
      }
    }
  }
}
</script>

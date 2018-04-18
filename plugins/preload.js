import Vue from "vue"
import _ from "lodash"

// const TIMEOUT = 5 * 1000;  // 5s以上かかれば強制的に読み込み完了とする

class VuePreload {
  constructor() {
    this.loaded = {}
    this.allloaded = false
  }
  install(Vue) {
    Vue.directive("preload", {
      bind: el => {
        //イベント監視前にブラウザによる load イベント発火を回避するために ダミーの src から本来の src に移動
        el.addEventListener("load", el => this.load(el), false)
        el.setAttribute("src", el.getAttribute("data-src"))
        el.removeAttribute("data-src")
        this.loaded[el.src] = false
        this.allloaded = false
      },
      unbind: el => {
        el.removeEventListener("load", el => this.load(el), false)
      }
    })
  }

  load(ev) {
    const target = ev.path[0]
    this.loaded[target.src] = true
    if (this.allLoadedCheck() && !this.allloaded) {
      this.allloaded = true
      target.dispatchEvent(new Event("allloaded"))
    }
  }

  /**
   * すべてのpreload 要素が読み込み完了したか確認
   */
  allLoadedCheck() {
    return _.every(
      Object.keys(this.loaded).map(key => this.loaded[key]),
      val => val === true
    )
  }
}

Vue.use(new VuePreload())

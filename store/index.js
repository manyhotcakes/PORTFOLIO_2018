import Vuex from 'vuex'

const store = () => new Vuex.Store({
  state: {
    scrollX: 0,
    scrollY: 0,
    windowW: 0,
    windowH: 0,
  },
  mutations: {
    scrollUpdate (state) {
      state.scrollX = window.pageXOffset
      state.scrollY = window.pageYOffset
    },
    windowUpdate (state) {
      state.windowW = window.innerWidth;
      state.windowH = window.innerHeight;
    },
  },
  getters: {
    scrollYTop: (state) => state.scrollY,
    scrollYBottom: (state) => state.scrollY + state.windowH,
  }
})

export default store

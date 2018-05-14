export const state = function() {
  const data = {
    scrollX: 0,
    scrollY: 0,
    windowW: 0,
    windowH: 0,
    isScrollStop: false,
    modal: {}
  }
  // modal データは下記で組み立てる
  // 作成するmodal以下のオブジェクト名
  const modalContentKeys = ["works", "img"]
  // 各modal以下のオブジェクトの初期値
  const modalContentInitObject = {
    visible: false,
    type: null,
    contents: null
  }
  _.forEach(modalContentKeys, val => {
    data.modal[val] = _.cloneDeep(modalContentInitObject)
  })
  console.log(data)
  return data
}
export const mutations = {
  scrollUpdate(state) {
    state.scrollX = window.pageXOffset
    state.scrollY = window.pageYOffset
  },
  sizeUpdate(state) {
    state.windowW = window.innerWidth
    state.windowH = window.innerHeight
  },
  setModalData(state, data) {
    state.modal = _.assign(state.modal, data)
  },
  setScrollStop(state, bool) {
    state.isScrollStop = !!bool
  },
  unsetModalData(state) {
    state.modal = null
  }
}
export const getters = {
  scrollX: state => state.scrollX,
  scrollY: state => state.scrollY,
  scrollXRight: state => state.scrollX + state.windowW,
  scrollYBottom: state => state.scrollY + state.windowH,
  windowW: state => state.windowW,
  windowH: state => state.windowH,
  getModalData: state => state.modal,
  isScrollStop: state => state.isScrollStop
}

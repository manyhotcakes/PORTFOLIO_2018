export const state = () => ({
  isAllLoad: false
})
export const mutations = {
  finish(state) {
    state.isAllLoad = true
  }
}
export const getters = {
  isFinish: state => state.isAllLoad
}

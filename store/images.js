export const state = () => ({
  items: {}
})
export const mutations = {
  set(state, [path, data]) {
    state.items[path] = data
  }
}
export const getters = {
  get: state => path => state.items[path]
}

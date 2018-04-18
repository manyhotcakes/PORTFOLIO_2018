export const state = () => ({
  items: {}
})
export const mutations = {
  set(state, [key, data]) {
    state.items[key] = data
    console.log("state.items", state.items)
  }
}
export const getters = {
  get: state => key => state.items[key]
}

export const state = () => ({
  items: {},
});
export const mutations = {
  set(state, [key, data]) {
    state.items[key] = data;
  }
};
export const getters = {
  get: (state) => (key) => state.items[key],
};

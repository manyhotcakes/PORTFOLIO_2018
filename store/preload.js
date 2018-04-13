import _ from 'lodash';

export const state = () => ({
  isAllLoad: false,
});
export const mutations = {
  finish(state, key) {
    state.isAllLoad = true;
  }
};
export const getters = {
  isFinish: (state) => state.isAllLoad,
};

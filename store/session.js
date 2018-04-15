import _ from 'lodash';

export const state = () => ({
  pw: null,
});
export const mutations = {
  setPw(state, pw) {
    state.pw = pw;
  }
};
export const getters = {
  getPw: (state) => state.pw,
};

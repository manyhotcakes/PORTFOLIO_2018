import _ from 'lodash';

export const state = () => ({
  pw: null,
});
export const mutations = {
  pw(state, pw) {
    console.log(pw);
    state.pw = pw;
  }
};
export const getters = {
  pw: (state) => state.pw,
};

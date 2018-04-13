export const state = () => ({
  scrollX: 0,
  scrollY: 0,
  windowW: 0,
  windowH: 0,
});
export const mutations = {
  scrollUpdate (state) {
    state.scrollX = window.pageXOffset
    state.scrollY = window.pageYOffset
  },
  sizeUpdate (state) {
    state.windowW = window.innerWidth;
    state.windowH = window.innerHeight;
  },
};
export const getters = {
  scrollX: (state) => state.scrollX,
  scrollY: (state) => state.scrollY,
  scrollXRight: (state) => state.scrollX + state.windowW,
  scrollYBottom: (state) => state.scrollY + state.windowH,
  windowW: (state) => state.windowW,
  windowH: (state) => state.windowH,
};

// MUTATIONS

export default {
  TOOGLE_SIDEBAR_STATE: (state, payload) => {
    state.layout.shrink = payload;
  },
  UPDATE_PELEMENTS: (state, payload) => {
    state.elements.list = payload;
  },
};

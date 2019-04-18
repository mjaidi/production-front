// MUTATIONS

export default {
  TOOGLE_SIDEBAR_STATE: (state, payload) => {
    state.layout.shrink = payload;
  },
  UPDATE_PELEMENTS: (state, payload) => {
    state.elements.list = payload;
  },
  CHANGE_ACTIVE_ELEMENT: (state, payload) => {
    state.elements.activeElement = state.elements.list.find(e => e.attributes.id === payload)
  },
};

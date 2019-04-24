// MUTATIONS
import router from '../router'

export default {
  TOOGLE_SIDEBAR_STATE: (state, payload) => {
    state.layout.shrink = payload;
  },
  TOOGLE_SIDE_BY_SIDE: (state, payload) => {
    state.layout.sideBySide = payload;
  },
  UPDATE_ELEMENTS: (state, payload) => {
    state.elements.list = payload;
    state.elements.updateList = false;
  },
  CHANGE_ACTIVE_ELEMENT: (state, payload) => {
    state.elements.activeElement = state.elements.list.find(e => e.attributes.id === payload);
  },
  UPDATE_ACTIVE_ELEMENT: (state, payload) => {
    state.elements.activeElement = payload;
    state.elements.updateList = true;
  },
  CREATE_NEW_ELEMENT: (state, payload) => {
    state.elements.activeElement = payload;
    state.elements.updateList = true;
    router.push({
      path: '/elements/edit/' + payload.id
    });
  },
};

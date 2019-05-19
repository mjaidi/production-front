// MUTATIONS
import router from '../router';

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
  RESET_ACTIVE_ELEMENT: (state, payload) => {
    state.elements.activeElement = null;
    state.elements.list = state.elements.list.filter(e => e.id !== payload);
  },
  UPDATE_ACTIVE_ELEMENT: (state, payload) => {
    state.elements.activeElement = payload;
    state.elements.updateList = true;
  },
  CREATE_NEW_ELEMENT: (state, payload) => {
    state.elements.activeElement = payload;
    state.elements.updateList = true;
    router.push({
      path: `/elements/edit/${payload.id}`,
    });
  },
  SET_FLASH: (state, payload) => {
    state.layout.flash = payload;
  },
  UPDATE_ESTIMATES: (state, payload) => {
    state.estimates.list = payload;
    state.estimates.updateList = false;
  },
  RESET_ACTIVE_ESTIMATE: (state, payload) => {
    state.estimates.activeEstimate = null;
    state.estimates.list = state.estimates.list.filter(e => e.id !== payload);
  },
  UPDATE_ACTIVE_ESTIMATE: (state, payload) => {
    state.estimates.activeEstimate = payload;
    state.estimates.updateList = true;
  },
  CREATE_NEW_ESTIMATE: (state, payload) => {
    state.estimates.activeEstimate = payload;
    state.estimates.updateList = true;
    router.push({
      path: `/estimates/edit/${payload.id}`,
    });
  },
};
